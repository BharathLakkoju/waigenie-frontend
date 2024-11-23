import os
from llama_index.llms.gemini import Gemini
from llama_index.core.llms import ChatMessage
from llama_index.embeddings.gemini import GeminiEmbedding
from llama_index.multi_modal_llms.gemini import GeminiMultiModal
from lavague.core import WorldModel, ActionEngine
from lavague.core.agents import WebAgent
from lavague.core.context import Context
from lavague.drivers.selenium import SeleniumDriver
from PIL import Image
from io import BytesIO
import base64
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# Initialize the LLM and other required components
llm = Gemini(model_name="models/gemini-1.5-flash-latest", api_key=os.getenv("GOOGLE_API_KEY"))
mm_llm = GeminiMultiModal(model_name="models/gemini-1.5-pro-latest", api_key=os.getenv("GOOGLE_API_KEY"))
embedding = GeminiEmbedding(model_name="models/text-embedding-004", api_key=os.getenv("GOOGLE_API_KEY"))

context = Context(llm=llm, mm_llm=mm_llm, embedding=embedding)

import time
from tenacity import retry, stop_after_attempt, wait_fixed

@retry(stop=stop_after_attempt(5), wait=wait_fixed(2))
def run_agent(agent, objective):
    return agent.run(objective)

def main(url, feature_content, language, chrome_driver):
    # Parse feature content
    feature_name = "generated_feature"
    feature_file_name = f"{feature_name}.feature"
    test_case = feature_content
    # Initialize the agent
    selenium_driver = SeleniumDriver(driver=chrome_driver)
    world_model = WorldModel.from_context(context)
    action_engine = ActionEngine.from_context(context, selenium_driver)
    agent = WebAgent(world_model, action_engine)
    objective = f"Run this test case: \n\n{test_case}"
    
    print("--------------------------")
    print(f"Running test case:\n{test_case}")
    
    # Use WebDriverWait instead of agent.get(url)
    chrome_driver.get(url)
    WebDriverWait(chrome_driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "body"))
    )
    
    try:
        run_agent(agent, objective)
    except Exception as e:
        print(f"Error while running the agent: {str(e)}")
        # If the agent fails, we'll still try to generate code based on the test case
    
    print("--------------------------")
    print(f"Processing run...\n{test_case}")
    
    try:
        nodes = action_engine.navigation_engine.get_nodes(
            f"We have ran the test case, generate the final assert statement.\n\ntest case:\n{test_case}"
        )
    except Exception as e:
        print(f"Error getting nodes: {str(e)}")
        nodes = []
    
    # Parse logs
    try:
        logs = agent.logger.return_pandas()
        last_screenshot_path = get_latest_screenshot_path(logs.iloc[-1]["screenshots_path"])
        b64_img = pil_image_to_base64(last_screenshot_path)
        selenium_code = "\n".join(logs["code"].dropna())
    except Exception as e:
        print(f"Error parsing logs: {str(e)}")
        b64_img = ""
        selenium_code = ""
    
    print("--------------------------")
    print(f"Generating {language} code")
    
    # Generate test code
    if language.lower() == "python":
        code = generate_pytest_code(url, feature_file_name, test_case, selenium_code, nodes, b64_img)
    else:  # Java
        code = generate_java_code(url, feature_file_name, test_case, selenium_code, nodes, b64_img)
    
    if code is None:
        raise Exception("Failed to generate code after multiple retries")
    
    return code

def get_latest_screenshot_path(directory):
    # List all files in the directory
    files = os.listdir(directory)
    # Get the full path of the files
    full_paths = [os.path.join(directory, f) for f in files]
    # Find the most recently modified file
    latest_file = max(full_paths, key=os.path.getmtime)
    return latest_file

def pil_image_to_base64(image_path):
    # Open the image file
    with Image.open(image_path) as img:
        # Convert image to BytesIO object
        buffered = BytesIO()
        img.save(buffered, format="PNG")
        # Encode the BytesIO object to base64
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return img_str

def generate_pytest_code(url, feature_file_name, test_case, selenium_code, nodes, b64_img):
    prompt = f"""Generate a Python Selenium test script with the following inputs and structure examples to guide you:
    Base url: {url}
    Feature file name: {feature_file_name}
    Test case: {test_case}
    Already executed code:
    {selenium_code}
    Selected html of the last page: {nodes}
    Image: {b64_img}
    Examples:
    {PYTHON_EXAMPLES}
    """
    messages = [ChatMessage(role="user", content=prompt)]
    max_retries = 5
    delay = 2  # in seconds
    retry_count = 0
    while retry_count < max_retries:
        try:
            response = llm.chat(messages)
            return response.message.content
        except Exception as e:
            print(f"Error: {e}")
        time.sleep(delay)
        retry_count += 1
    return None

def generate_java_code(url, feature_file_name, test_case, selenium_code, nodes, b64_img):
    prompt = f"""Generate a Java Selenium test script with the following inputs and structure examples to guide you:
    Base url: {url}
    Feature file name: {feature_file_name}
    Test case: {test_case}
    Already executed code:
    {selenium_code}
    Selected html of the last page: {nodes}
    Image: {b64_img}
    Examples:
    {JAVA_EXAMPLES}
    """
    messages = [ChatMessage(role="user", content=prompt)]
    max_retries = 3
    delay = 1  # in seconds
    retry_count = 0
    while retry_count < max_retries:
        try:
            response = llm.chat(messages)
            return response.message.content
        except Exception as e:
            print(f"Error: {e}")
        time.sleep(delay)
        retry_count += 1
    return None

PYTHON_EXAMPLES = """
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
# Constants
BASE_URL = '{url}'

class JobApplicationTest:
    def __init__(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(10)

    def setup(self):
        self.driver.get(BASE_URL)

    def teardown(self):
        self.driver.quit()

    def given_i_am_on_the_job_application_page(self):
        # This step is handled by the setup method
        pass

    def when_i_enter_first_name(self, first_name):
        first_name_field = self.driver.find_element(By.XPATH, "/html/body/form/div[1]/ul/li[2]/div/div/span[1]/input")
        first_name_field.send_keys(first_name)

    def when_i_enter_last_name(self, last_name):
        last_name_field = self.driver.find_element(By.XPATH, "/html/body/form/div[1]/ul/li[2]/div/div/span[2]/input")
        last_name_field.send_keys(last_name)

    def when_i_enter_email_address(self, email):
        email_field = self.driver.find_element(By.XPATH, "/html/body/form/div[1]/ul/li[3]/div/span/input")
        email_field.send_keys(email)

    def when_i_enter_phone_number(self, phone_number):
        phone_number_field = self.driver.find_element(By.XPATH, "/html/body/form/div[1]/ul/li[4]/div/span/input")
        phone_number_field.send_keys(phone_number)

    def when_i_leave_cover_letter_empty(self):
        # No action needed as the field should remain empty
        pass

    def when_i_click_apply_button(self):
        apply_button = WebDriverWait(self.driver, 10).until(
            EC.element_to_be_clickable((By.XPATH, "/html/body/form/div[1]/ul/li[6]/div/div/button"))
        )
        self.driver.execute_script("arguments[0].scrollIntoView(true);", apply_button)
        apply_button.click()

    def then_i_should_see_error_message_for_cover_letter(self):
        try:
            error_message = self.driver.find_element(By.XPATH, "/html/body/form/div[1]/ul/li[5]/div/div/span")
            assert error_message.is_displayed(), "Error message for Cover Letter field is not displayed"
        except Exception as e:
            raise AssertionError(f"Error message not displayed: {e}")

    def run_test(self):
        try:
            self.setup()
            self.given_i_am_on_the_job_application_page()
            self.when_i_enter_first_name("John")
            self.when_i_enter_last_name("Doe")
            self.when_i_enter_email_address(john.doe@example.com)
            self.when_i_enter_phone_number("(123) 456-7890")
            self.when_i_leave_cover_letter_empty()
            self.when_i_click_apply_button()
            self.then_i_should_see_error_message_for_cover_letter()
            print("Test passed: Job application scenario completed successfully.")
        except AssertionError as e:
            print(f"Test failed: {str(e)}")
        except Exception as e:
            print(f"Test failed: An unexpected error occurred: {str(e)}")
        finally:
            self.teardown()

if __name__ == "__main__":
    test = JobApplicationTest()
    test.run_test()
"""

JAVA_EXAMPLES = """
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class JobApplicationTest {
    private WebDriver driver;
    private String baseUrl;

    @BeforeMethod
    public void setup() {
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, java.util.concurrent.TimeUnit.SECONDS);
        baseUrl = "{url}"; // Replace with the actual base URL
        driver.get(baseUrl);
    }

    @AfterMethod
    public void teardown() {
        driver.quit();
    }

    @Test
    public void jobApplicationScenario() {
        givenIAmOnTheJobApplicationPage();
        whenIEnterFirstName("John");
        whenIEnterLastName("Doe");
        whenIEnterEmailAddress(john.doe@example.com);
        whenIEnterPhoneNumber("(123) 456-7890");
        whenILeaveCoverLetterEmpty();
        whenIClickApplyButton();
        thenIShouldSeeErrorMessageForCoverLetter();
    }

    private void givenIAmOnTheJobApplicationPage() {
        // This step is handled by the setup method
    }

    private void whenIEnterFirstName(String firstName) {
        WebElement firstNameField = driver.findElement(By.xpath("/html/body/form/div[1]/ul/li[2]/div/div/span[1]/input"));
        firstNameField.sendKeys(firstName);
    }

    private void whenIEnterLastName(String lastName) {
        WebElement lastNameField = driver.findElement(By.xpath("/html/body/form/div[1]/ul/li[2]/div/div/span[2]/input"));
        lastNameField.sendKeys(lastName);
    }

    private void whenIEnterEmailAddress(String email) {
        WebElement emailField = driver.findElement(By.xpath("/html/body/form/div[1]/ul/li[3]/div/span/input"));
        emailField.sendKeys(email);
    }

    private void whenIEnterPhoneNumber(String phoneNumber) {
        WebElement phoneNumberField = driver.findElement(By.xpath("/html/body/form/div[1]/ul/li[4]/div/span/input"));
        phoneNumberField.sendKeys(phoneNumber);
    }

    private void whenILeaveCoverLetterEmpty() {
        // No action needed as the field should remain empty
    }

    private void whenIClickApplyButton() {
        WebElement applyButton = new WebDriverWait(driver, 10).until(
                ExpectedConditions.elementToBeClickable(By.xpath("/html/body/form/div[1]/ul/li[6]/div/div/button"))
        );
        ((JavascriptExecutor) driver).executeScript("arguments[0].scrollIntoView(true);", applyButton);
        applyButton.click();
    }

    private void thenIShouldSeeErrorMessageForCoverLetter() {
        try {
            WebElement errorMessage = driver.findElement(By.xpath("/html/body/form/div[1]/ul/li[5]/div/div/span"));
            Assert.assertTrue(errorMessage.isDisplayed(), "Error message for Cover Letter field is not displayed");
        } catch (Exception e) {
            Assert.fail("Error message not displayed: " + e.getMessage());
        }
    }
}
"""
