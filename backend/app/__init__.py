from flask import Flask
from flask_cors import CORS
from config import Config
from app.routes.proxy import proxy_bp
from app.routes.test_idea_generation import test_idea_bp
from app.routes.element_inspector import element_inspector_bp
from app.routes.gherkin_generator import gherkin_generator_bp
from app.routes.automation_code_generator import automation_code_generator_bp
from app.routes.agent_explorer import agent_explorer_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Configure CORS to allow all origins for all routes
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

    app.register_blueprint(proxy_bp)
    app.register_blueprint(test_idea_bp)
    app.register_blueprint(element_inspector_bp)
    app.register_blueprint(gherkin_generator_bp)
    app.register_blueprint(automation_code_generator_bp)
    app.register_blueprint(agent_explorer_bp)

    return app
