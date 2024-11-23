from flask import Blueprint, request, jsonify
from app.services.llm_services import generate_gherkin_feature, generate_manual_test_cases, convert_manual_to_gherkin
import traceback

gherkin_generator_bp = Blueprint('gherkin_generator', __name__)

@gherkin_generator_bp.route('/api/generate-gherkin', methods=['POST'])
def generate_gherkin():
    try:
        data = request.json
        user_story = data['userStory']
        detail_level = data['detailLevel']
        generation_method = data.get('generationMethod', 'direct')
        
        if generation_method == 'direct':
            gherkin_feature = generate_gherkin_feature(user_story, detail_level)
            return jsonify({"gherkinFeature": gherkin_feature})
        else:  # manual-first
            manual_test_cases = generate_manual_test_cases(user_story)
            gherkin_feature = convert_manual_to_gherkin(manual_test_cases, detail_level)
            return jsonify({
                "manualTestCases": manual_test_cases,
                "gherkinFeature": gherkin_feature
            })
    except Exception as e:
        print(f"Error in generate_gherkin: {str(e)}")
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500
