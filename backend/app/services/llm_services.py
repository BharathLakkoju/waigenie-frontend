from llama_index.core.llms import ChatMessage
import os
from llama_index.multi_modal_llms.gemini import GeminiMultiModal
from llama_index.llms.gemini import Gemini


llm = Gemini(model_name="models/gemini-1.5-flash-latest", api_key=os.getenv("GOOGLE_API_KEY"))
mm_llm = GeminiMultiModal(model_name="models/gemini-1.5-flash", api_key=os.getenv("GOOGLE_API_KEY"))

def generate_test_ideas(url, selected_elements):
    role = "You are a Software Test Consultant with expertise in web application testing"
    prompt = f"""Generate test ideas based on the selected elements of the webpage. 
    Focus on user-oriented tests that cover functionality, usability, and potential edge cases. 
    Include both positive and negative test scenarios. Consider the element types and their potential interactions.

    Page URL: {url}
    
    Selected Elements:
    {selected_elements}

    Please provide a mix of positive and negative test scenarios, considering the interactions between the selected elements.
    Format the output as a numbered list of test scenarios.

    Format the output as the following example:
    Positive Tests:
    - <Idea 1>
    - <Idea 2>

    Negative Tests:
    - <Idea 1>
    - <Idea 2>

    Edge Cases and Usability Tests:
    - <Idea 1>
    - <Idea 2>
    """
    
    messages = [ChatMessage(role="system", content=role),
                ChatMessage(role="user", content=prompt)]
    response = mm_llm.chat(messages)
    return response.message.content

def generate_manual_test_cases(input_data):
    role = "You are a Senior QA Engineer specializing in creating detailed manual test cases"
    prompt = f"""Create detailed manual test cases based on the given input. 
    This input could be a user story or information about a webpage with selected elements.
    Focus on providing step-by-step instructions that a manual tester would follow to thoroughly test the functionality.
    Include preconditions, test steps, expected results, and any necessary test data.

    Input:
    {input_data}

    Please provide a set of manual test cases that cover the following aspects:
    1. Functional testing of the main features described in the input
    2. Usability testing
    3. Edge cases and boundary value analysis
    4. Error handling and validation

    Format each test case as follows:
    
    Test Case ID: TC_001
    Title: [Brief description of the test case]
    Objective: [What the test case aims to verify]
    Preconditions: [Any necessary setup or conditions before starting the test]
    Test Steps:
    1. [Step 1]
    2. [Step 2]
    3. ...
    Expected Result: [What should happen if the test passes]
    Test Data: [Any specific data to be used in the test]
    
    Please create at least 5 detailed test cases.
    """
    
    messages = [ChatMessage(role="system", content=role),
                ChatMessage(role="user", content=prompt)]
    response = mm_llm.chat(messages)
    return response.message.content

def generate_gherkin_feature(user_story, detail_level):
    if detail_level == "Detailed":
        custom_prompt_template = """Create a comprehensive Gherkin feature file based on the provided user story. Follow these instructions to produce a detailed output:
                                Instructions:
                                1. Carefully analyze the user story and extract all possible scenarios, including edge cases and alternative flows.
                                2. Create multiple scenarios to cover various aspects of the feature, considering different user inputs, conditions, and outcomes.
                                3. Use descriptive and specific language for each step.
                                4. Include background steps if there are common preconditions for all scenarios.
                                5. Utilize scenario outlines with examples for data-driven scenarios when appropriate.
                                6. Consider both happy path and negative scenarios.
                                7. Add relevant tags to group related scenarios.
                                FORMAT:
                                Feature: [Feature Name]
                                As a [type of user]
                                I want [goal]
                                So that [benefit]
                                Background: (if applicable)
                                    Given [common preconditions]

                                @tag1 @tag2
                                Scenario: [Primary Scenario Name]
                                    Given [precondition]
                                    And [another precondition]
                                    When [action]
                                    And [another action]
                                    Then [expected result]
                                    And [another expected result]

                                @tag3
                                Scenario: [Alternative Scenario Name]
                                    Given [different precondition]
                                    When [different action]
                                    Then [different expected result]

                                @tag4
                                Scenario Outline: [Data-driven Scenario Name]
                                    Given [precondition with <variable>]
                                    When [action with <variable>]
                                    Then [expected result with <variable>]

                                    Examples:
                                    | variable | other_variable |
                                    | value1   | other_value1   |
                                    | value2   | other_value2   |

                                @negative @edge_case
                                Scenario: [Negative Scenario Name]
                                    Given [precondition for negative case]
                                    When [action that should fail]
                                    Then [expected error or failure result]

                                Context: {context}
                                Answer:
                                """
    else:
        custom_prompt_template = """Create the feature file as per BDD framework for provided test case in question. Follow below instructions to produce output
                    Instructions
                    1. Carefully analyse the test case provided with each step.
                    2. Do not skip or ignore any test step as these are critical for feature file creation.
                    3. Your correct interpretation would help subsequent prompt to provide correct responses.
                    4. Strictly adhere to the format provided below.
                    FORMAT
                    Feature: [Feature Name]
                    Description: [Brief description of the functionality under test]

                    Scenario Outline: [Scenario Name]
                    Given [Preconditions]
                    When [Event or Action]
                    Then [Expected result]
                    And [Additional expected results]
                    But [Optional: Negative expected results]

                    Examples:
                    | [Parameter 1] | [Parameter 2] |... |
                    | [Value 1]     | [Value 2]     |... |
                    | [Value 3]     | [Value 4]     |... |

                    Context: {context}
                    Answer:
                    """

    prompt = custom_prompt_template.format(context=user_story)
    messages = [ChatMessage(role="user", content=prompt)]
    response = llm.chat(messages)
    return response.message.content

def convert_manual_to_gherkin(manual_test_cases, detail_level):
    role = "You are a BDD expert specializing in converting manual test cases to Gherkin scenarios"
    prompt = f"""Convert the following manual test cases into Gherkin scenarios. 
    Use the appropriate Gherkin syntax (Feature, Scenario, Given, When, Then, And, But) to create a comprehensive feature file.

    Manual Test Cases:
    {manual_test_cases}

    Detail Level: {detail_level}

    Please follow these guidelines:
    1. Create a Feature description based on the overall functionality being tested.
    2. Convert each test case into one or more scenarios.
    3. Use Background for common preconditions across scenarios.
    4. Utilize Scenario Outline for data-driven scenarios if applicable.
    5. Include appropriate tags for organization and traceability.
    6. Ensure the Gherkin scenarios capture all the important aspects of the manual test cases.

    Please provide the Gherkin feature file as the output.
    """
    
    messages = [ChatMessage(role="system", content=role),
                ChatMessage(role="user", content=prompt)]
    response = mm_llm.chat(messages)
    return response.message.content

