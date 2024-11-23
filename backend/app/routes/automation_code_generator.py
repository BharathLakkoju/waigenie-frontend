import os
import base64
from flask import Blueprint, request, jsonify
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from app.services.code_generator import main
import traceback
import threading
import time

automation_code_generator_bp = Blueprint('automation_code_generator', __name__)

chrome_driver = None
screenshot_path = 'screenshots/latest.png'
screenshot_thread = None

def setup_chrome_driver():
    global chrome_driver
    chrome_options = Options()
    chrome_options.add_argument('--headless')
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    service = Service(ChromeDriverManager().install())
    
    chrome_driver = webdriver.Chrome(service=service, options=chrome_options)
    return chrome_driver

def capture_screenshot():
    global chrome_driver, screenshot_path
    if chrome_driver:
        chrome_driver.save_screenshot(screenshot_path)

@automation_code_generator_bp.route('/api/start-browser', methods=['POST'])
def start_browser():
    try:
        global chrome_driver, screenshot_thread
        chrome_driver = setup_chrome_driver()
        
        # Start a thread to capture screenshots periodically
        screenshot_thread = threading.Thread(target=periodic_screenshot_capture)
        screenshot_thread.start()
        
        return jsonify({"message": "Browser started successfully"})
    except Exception as e:
        print(f"Error starting browser: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@automation_code_generator_bp.route('/api/generate-code', methods=['POST'])
def generate_automation_code():
    global chrome_driver
    try:
        data = request.json
        url = data['url']
        feature_content = data['featureContent']
        language = data['language']
        
        if not chrome_driver:
            chrome_driver = setup_chrome_driver()
        
        code = main(url, feature_content, language, chrome_driver)
        
        return jsonify({"code": code})
    except Exception as e:
        print(f"Error in generate_automation_code: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

def periodic_screenshot_capture():
    thread = threading.current_thread()
    while getattr(thread, "do_run", True):
        capture_screenshot()
        time.sleep(1)  # Capture a screenshot every second

@automation_code_generator_bp.route('/api/get-screenshot', methods=['GET'])
def get_screenshot():
    if os.path.exists(screenshot_path):
        with open(screenshot_path, "rb") as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode()
        return jsonify({"screenshot": encoded_string})
    else:
        return jsonify({"error": "Screenshot not available"}), 404

@automation_code_generator_bp.route('/api/stop-browser', methods=['POST'])
def stop_browser():
    global chrome_driver, screenshot_thread
    if screenshot_thread:
        screenshot_thread.do_run = False
        screenshot_thread.join()
    if chrome_driver:
        chrome_driver.quit()
        chrome_driver = None
    if os.path.exists(screenshot_path):
        os.remove(screenshot_path)
    return jsonify({"message": "Browser stopped successfully"})
