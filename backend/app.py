from flask import Flask
from flask_cors import CORS
from api.players import players_blueprint
from api.teams import teams_blueprint

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Requests for frontend access

# Register Blueprints (Modular API Routes)
app.register_blueprint(players_blueprint, url_prefix='/players')
app.register_blueprint(teams_blueprint, url_prefix='/teams')

if __name__ == "__main__":
    app.run(debug=True)