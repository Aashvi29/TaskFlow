from app import create_app #Go to the app package (the backend/app folder) and import a function called create_app

app = create_app() #alls the function and creates your Flask application

if __name__ == "__main__": #If this file is being run directly (python app.py), start the Flask development server.
    app.run(debug=True)  #debug=True->Automatically reloads the server when you save changes.Shows detailed error messages if something goes wrong.