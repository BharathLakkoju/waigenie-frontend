from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium import webdriver
from lavague.core import WorldModel, ActionEngine
from lavague.core.agents import WebAgent
from lavague.core.context import Context
from lavague.drivers.selenium import SeleniumDriver
from llama_index.embeddings.gemini import GeminiEmbedding
from llama_index.llms.gemini import Gemini
from llama_index.multi_modal_llms.gemini import GeminiMultiModal
import os, csv, base64, io, time, json


# Initialize the LLM and other required components
llm = Gemini(model_name="models/gemini-1.5-flash-latest", api_key=os.getenv("GOOGLE_API_KEY"))
mm_llm = GeminiMultiModal(model_name="models/gemini-1.5-flash", api_key=os.getenv("GOOGLE_API_KEY"))
embedding = GeminiEmbedding(model_name="models/text-embedding-004", api_key=os.getenv("GOOGLE_API_KEY"))

context = Context(llm=llm, mm_llm=mm_llm, embedding=embedding)

def setup_interactive_browser(url):
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.set_capability('goog:loggingPrefs', {'performance': 'ALL'})
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.get(url)
    return driver

def run_web_agent(objective: str, driver, max_retries=3, retry_delay=5):
    results = []
    retry_count = 0

    while retry_count < max_retries:
        try:
            selenium_driver = SeleniumDriver(driver=driver)
            world_model = WorldModel.from_context(context)
            action_engine = ActionEngine.from_context(context, selenium_driver)
            agent = WebAgent(world_model, action_engine)

            for step in range(agent.n_steps):
                step_retry_count = 0
                while step_retry_count < max_retries:
                    try:
                        result = agent.run(objective)
                        screenshot = driver.get_screenshot_as_png()
                        screenshot_b64 = base64.b64encode(screenshot).decode('utf-8')

                        step_result = {
                            "step": step + 1,
                            "current_url": driver.current_url,
                            "screenshot": screenshot_b64,
                            "action_taken": result.instruction,
                            "output": result.output,
                            "success": result.success
                        }
                        results.append(step_result)

                        if result.success:
                            print("2024-09-20 15:29:43,657 - INFO - Objective reached. Stopping...")
                            return results

                    except Exception as step_error:
                        print(f"Error during step {step + 1}: {str(step_error)}")
                        results.append({
                            "step": step + 1,
                            "error": str(step_error)
                        })
                        step_retry_count += 1
                        time.sleep(retry_delay)
                    else:
                        break

            break

        except Exception as e:
            print(f"Error during web agent execution: {str(e)}")
            results.append({"error": str(e)})
            retry_count += 1
            time.sleep(retry_delay)

    return results

def capture_screenshot(driver):
    return driver.get_screenshot_as_png()
