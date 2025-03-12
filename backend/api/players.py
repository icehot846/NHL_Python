from flask import Blueprint, jsonify
from db.db_connection import get_db_connection

players_bp = Blueprint('players', __name__)

@players_bp.route('/', methods=['GET'])
def get_players():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM players")
    players = cursor.fetchall()
    cursor.close()
    connection.close()
    return jsonify(players)

@players_bp.route('/<int:player_id>', methods=['GET'])
def get_player(player_id):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM players WHERE id = %s", (player_id,))
    player = cursor.fetchone()
    cursor.close()
    connection.close()
    if player:
        return jsonify(player)
    return jsonify({"error": "Player not found"}), 404