from flask import Flask, jsonify
from flask_cors import CORS
from api.teams import teams_bp

app = Flask(__name__)
CORS(app)

# Prevent caching for API responses
@app.after_request
def add_cache_headers(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response

# Register Blueprints
app.register_blueprint(teams_bp, url_prefix='/api/teams')

if __name__ == "__main__":
    app.run(debug=True, port=5000)