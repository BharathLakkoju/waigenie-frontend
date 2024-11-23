from flask import Blueprint, request, jsonify, send_file
import requests
from bs4 import BeautifulSoup
import pandas as pd
import io

element_inspector_bp = Blueprint('element_inspector', __name__)

@element_inspector_bp.route('/api/proxy', methods=['POST'])
def proxy():
    data = request.json
    url = data['url']
    
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Update all relative URLs to absolute
        for tag in soup.find_all(['link', 'script', 'img', 'a']):
            for attr in ['href', 'src']:
                if tag.has_attr(attr):
                    tag[attr] = requests.compat.urljoin(url, tag[attr])

        # Inject our element inspection script
        script = soup.new_tag('script')
        script.string = """
        function identifyElements() {
            const elements = Array.from(document.body.getElementsByTagName('*'));
            const totalElements = elements.length;
            const chunkSize = 100;
            let currentIndex = 0;

            function processChunk() {
                const chunk = elements.slice(currentIndex, currentIndex + chunkSize);
                const elementData = [];

                chunk.forEach((element, index) => {
                    const rect = element.getBoundingClientRect();
                    if (rect.width > 0 && rect.height > 0) {
                        highlightElement(element, currentIndex + index + 1);
                        elementData.push({
                            id: currentIndex + index + 1,
                            tag: element.tagName,
                            elementId: element.id,
                            className: element.className,
                            xpath: getXPath(element)
                        });
                    }
                });

                window.parent.postMessage({
                    type: 'elementsIdentified',
                    elements: elementData,
                    progress: (currentIndex + chunkSize) / totalElements
                }, '*');

                currentIndex += chunkSize;
                if (currentIndex < totalElements) {
                    setTimeout(processChunk, 0);
                } else {
                    window.parent.postMessage({ type: 'identificationComplete' }, '*');
                }
            }

            processChunk();
        }

        function highlightElement(element, id) {
            element.style.outline = '2px solid red';
            const rect = element.getBoundingClientRect();
            const overlay = document.createElement('div');
            overlay.textContent = id;
            overlay.style.position = 'absolute';
            overlay.style.backgroundColor = 'rgba(255, 0, 0, 0.7)';
            overlay.style.color = 'white';
            overlay.style.padding = '2px 5px';
            overlay.style.borderRadius = '3px';
            overlay.style.fontSize = '12px';
            overlay.style.zIndex = '10000';
            overlay.style.pointerEvents = 'none';
            overlay.style.left = (rect.left - 25) + 'px';
            overlay.style.top = (rect.top - 25) + 'px';

            if (rect.left < 30) {
                overlay.style.left = rect.right + 'px';
            }

            if (rect.top < 30) {
                overlay.style.top = rect.bottom + 'px';
            }
            document.body.appendChild(overlay);
        }

        function getXPath(element) {
            if (element.id !== '')
                return 'id("' + element.id + '")';
            if (element === document.body)
                return element.tagName;

            let ix = 0;
            const siblings = element.parentNode.childNodes;
            for (let i = 0; i < siblings.length; i++) {
                const sibling = siblings[i];
                if (sibling === element)
                    return getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
                if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
                    ix++;
            }
        }

        // Expose the function to be called from the parent window
        window.identifyElements = identifyElements;
        """
        soup.body.append(script)

        # Set the base URL to ensure relative paths resolve correctly
        base_tag = soup.new_tag('base', href=url)
        soup.head.insert(0, base_tag)

        return jsonify({"html": str(soup)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@element_inspector_bp.route('/api/generate-csv', methods=['POST'])
def generate_csv():
    data = request.json
    elements = data['elements']
    filename = data['filename']
    
    df = pd.DataFrame(elements)
    csv_buffer = io.BytesIO()
    df.to_csv(csv_buffer, index=False)
    csv_buffer.seek(0)
    
    return send_file(
        csv_buffer,
        mimetype='text/csv',
        as_attachment=True,
        download_name=filename,
        max_age=0
    )
