from flask import Blueprint, request, Response
import requests
from bs4 import BeautifulSoup
import base64

proxy_bp = Blueprint('proxy', __name__)

@proxy_bp.route('/proxy')
def proxy():
    url = request.args.get('url')
    if not url:
        return "No URL provided", 400

    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')

        # Update all relative URLs to absolute
        for tag in soup.find_all(['link', 'script', 'img', 'a']):
            for attr in ['href', 'src']:
                if tag.has_attr(attr):
                    tag[attr] = requests.compat.urljoin(url, tag[attr])

        # Inject our selection script
        script = soup.new_tag('script')
        script.string = """
        let selectedElements = [];
        document.body.addEventListener('click', (event) => {
            event.preventDefault();
            const element = event.target;
            const elementInfo = {
                tag: element.tagName,
                id: element.id,
                class: element.className,
                text: element.textContent.trim().substring(0, 50)
            };
            const index = selectedElements.findIndex(e => e.id === elementInfo.id && e.tag === elementInfo.tag);
            if (index > -1) {
                element.style.border = '';
                selectedElements.splice(index, 1);
            } else {
                element.style.border = '2px solid red';
                selectedElements.push(elementInfo);
            }
            window.parent.postMessage({ type: 'elementsSelected', elements: selectedElements }, '*');
        }, true);
        """
        soup.body.append(script)

        # Set the base URL to ensure relative paths resolve correctly
        base_tag = soup.new_tag('base', href=url)
        soup.head.insert(0, base_tag)

        return str(soup)
    except requests.RequestException as e:
        return f"Error fetching URL: {str(e)}", 500
