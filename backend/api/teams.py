from flask import Blueprint, jsonify
from db.db_connection import get_db_connection

teams_bp = Blueprint('teams', __name__)

@teams_bp.route('/', methods=['GET'])
def get_teams():
    """Fetch all NHL teams."""
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT abbreviation FROM teams")
    teams = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(teams)

@teams_bp.route('/<string:team_abbr>', methods=['GET'])
def get_team(team_abbr):
    """Fetch team details, players, and goalies."""
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    
    # Fetch team info
    cursor.execute("SELECT * FROM teams WHERE abbreviation = %s", (team_abbr,))
    team = cursor.fetchone()
    
    if not team:
        cursor.close()
        connection.close()
        return jsonify({"error": "Team not found"}), 404
    
    # Fetch players
    cursor.execute("SELECT * FROM players WHERE team_id = (SELECT id FROM teams WHERE abbreviation = %s)", (team_abbr,))
    players = cursor.fetchall()
    
    # Fetch goalies
    cursor.execute("SELECT * FROM goalies WHERE team_id = (SELECT id FROM teams WHERE abbreviation = %s)", (team_abbr,))
    goalies = cursor.fetchall()
    
    cursor.close()
    connection.close()
    
    return jsonify({
        "team": team,
        "players": players,
        "goalies": goalies
    })