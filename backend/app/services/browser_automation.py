#un-used

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import WebDriverException
import json, time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import csv
import io
import traceback

driver = None

def setup_interactive_browser(url):
    global driver
    chrome_options = Options()
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_experimental_option("detach", True)
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.get(url)
    
    js_code = """
    var selectedElements = [];
    document.body.addEventListener('click', function(event) {
        event.preventDefault();
        var element = event.target;
        var elementInfo = {
            tag: element.tagName,
            id: element.id,
            class: element.className,
            text: element.textContent.trim().substring(0, 50)
        };
        var index = selectedElements.findIndex(e => e.id === elementInfo.id && e.tag === elementInfo.tag);
        if (index > -1) {
            element.style.border = '';
            selectedElements.splice(index, 1);
        } else {
            element.style.border = '2px solid red';
            selectedElements.push(elementInfo);
        }
        localStorage.setItem('selectedElements', JSON.stringify(selectedElements));
    }, true);
    """
    driver.execute_script(js_code)

def get_selected_elements():
    global driver
    try:
        elements = driver.execute_script("return localStorage.getItem('selectedElements');")
        return json.loads(elements) if elements else []
    except Exception:
        return None

def capture_screenshot():
    global driver
    try:
        return driver.get_screenshot_as_png()
    except WebDriverException:
        return None

def close_browser():
    global driver
    try:
        if driver:
            driver.quit()
    except:
        pass
    finally:
        driver = None

def identify_elements_and_generate_csv(url, output_file='elements.csv'):
    chrome_options = Options()
    # Remove the headless option to see the browser actions
    # chrome_options.add_argument("--headless")
    #     Note that this approach will keep the browser window open until the user clicks the "Close Browser" button. This might not be ideal for a web application, as it could lead to resource issues if many users are using it simultaneously. In a production environment, you might want to consider:

    # Using a headless browser and returning screenshots instead of opening a visible browser.
    # Implementing a timeout mechanism to automatically close the browser after a certain period.
    # Using a queue system to handle multiple requests if you expect high traffic.

    # For now, this implementation should work well for demonstrating the functionality. Remember to test it thoroughly and adjust as needed based on your specific requirements and constraints.
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    def highlight_element(element):
        driver.execute_script(
            "arguments[0].setAttribute('style', arguments[1]);",
            element,
            "border: 2px solid red;"
        )

    def add_id_overlays(elements):
        js_script = """
        function addIdOverlay(element, id) {
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

        const elements = arguments[0];
        for (let i = 0; i < elements.length; i++) {
            addIdOverlay(elements[i], i);
        }
        """
        driver.execute_script(js_script, elements)

    def add_close_button():
        js_script = """
        const closeButton = document.createElement('button');
        closeButton.textContent = 'Close Browser';
        closeButton.style.position = 'fixed';
        closeButton.style.top = '10px';
        closeButton.style.right = '10px';
        closeButton.style.zIndex = '10001';
        closeButton.style.padding = '10px';
        closeButton.style.backgroundColor = '#4CAF50';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.onclick = function() {
            window.closeBrowser = true;
        };
        document.body.appendChild(closeButton);
        """
        driver.execute_script(js_script)

    try:
        driver.get(url)

        # Wait for the page to load
        WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        
        # Find all elements
        elements = driver.find_elements(By.XPATH, "//*[@id]")
        
        # Highlight elements and add overlays
        for element in elements:
            highlight_element(element)
        add_id_overlays(elements)
        
        # Add close button
        add_close_button()
        
        # Prepare data for CSV
        element_data = []
        for i, element in enumerate(elements):
            element_id = element.get_attribute("id")
            element_xpath = driver.execute_script(
                "function getXPath(element) {"
                "   if (element.id !== '')"
                "       return 'id(\"' + element.id + '\")';"
                "   if (element === document.body)"
                "       return element.tagName;"
                "   var ix = 0;"
                "   var siblings = element.parentNode.childNodes;"
                "   for (var i = 0; i < siblings.length; i++) {"
                "       var sibling = siblings[i];"
                "       if (sibling === element)"
                "           return getXPath(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';"
                "       if (sibling.nodeType === 1 && sibling.tagName === element.tagName)"
                "           ix++;"
                "   }"
                "}"
                "return getXPath(arguments[0]);", element
            )
            element_data.append([i, element_id, element_xpath])
        
        # Write to CSV
        with open(output_file, 'w', newline='') as csvfile:
            writer = csv.writer(csvfile)
            writer.writerow(['ID', 'Element ID', 'XPath'])
            writer.writerows(element_data)
        
        print(f"Element data has been written to {output_file}")
        
        # Wait for the close button to be clicked
        while True:
            if driver.execute_script("return window.closeBrowser === true;"):
                break
            time.sleep(0.5)  # Add a small delay to reduce CPU usage
        
        # Read the CSV content
        with open(output_file, 'r') as csvfile:
            csv_content = csvfile.read()
        
        return csv_content
    
    except Exception as e:
        print(f"Error in identify_elements_and_generate_csv: {str(e)}")
        print(traceback.format_exc())
        raise
    finally:
        driver.quit()
