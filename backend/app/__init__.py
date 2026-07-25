""" from flask import Flask #Go to the Flask library and bring me the Flask class


def create_app():  #Instead of creating the application immediately, we're creating a function whose job is:"Whenever someone asks, build and return a Flask application."
    app = Flask(__name__)  #Here we're creating the Flask application.
    # here app is variable : Flask creates web applications :__name__ is a buillt in py variable

    @app.route("/") #This is called a decorator.A decorator tells Flask:"When someone visits this URL..."
    
    def home():
        return "welcome to taskflow backend!"
    
    return app """

from flask import Flask
from .config import Config
from .extensions import db, migrate

def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app,db)
    from .models import Task

    from .routes import main

    app.register_blueprint(main)

    return app