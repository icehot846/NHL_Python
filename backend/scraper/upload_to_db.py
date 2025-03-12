import sys
import os

# Ensure the script can locate the 'db' package
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from db.db_connection import get_db_connection
from scraper.nhl_scraper import fetch_team_stats

TEAM_ABBREVIATIONS = ["TOR", "MTL", "CHI", "NYR", "BOS","ANA","BUF","CAR","CBJ","CGY","COL","DAL","DET",
                      "EDM","FLA","LAK","MIN","NJD","NSH","NYI","OTT","PHI","PIT",
                      "SEA","SJS","STL","TBL","UTA","VAN","VGK","WPG","WSH"]  # Add all NHL teams here

def insert_team(team_abbr):
    """Insert a team if not exists."""
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("INSERT IGNORE INTO teams (abbreviation) VALUES (%s)", (team_abbr,))
    connection.commit()
    cursor.close()
    connection.close()

def get_team_id(team_abbr):
    """Fetch the team ID from MySQL."""
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT id FROM teams WHERE abbreviation = %s", (team_abbr,))
    team_id = cursor.fetchone()
    cursor.close()
    connection.close()
    return team_id[0] if team_id else None

def insert_player(player, team_id):
    """Insert or update a player's stats in MySQL."""
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO players (player_id, team_id, first_name, last_name, position, games_played, goals, assists, points,
                             plus_minus, penalty_minutes, power_play_goals, shorthanded_goals, game_winning_goals, 
                             overtime_goals, shots, shooting_percentage, avg_time_on_ice, faceoff_win_percentage)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            games_played = VALUES(games_played),
            goals = VALUES(goals),
            assists = VALUES(assists),
            points = VALUES(points),
            plus_minus = VALUES(plus_minus),
            penalty_minutes = VALUES(penalty_minutes),
            power_play_goals = VALUES(power_play_goals),
            shorthanded_goals = VALUES(shorthanded_goals),
            game_winning_goals = VALUES(game_winning_goals),
            overtime_goals = VALUES(overtime_goals),
            shots = VALUES(shots),
            shooting_percentage = VALUES(shooting_percentage),
            avg_time_on_ice = VALUES(avg_time_on_ice),
            faceoff_win_percentage = VALUES(faceoff_win_percentage)
    """, (
        player["playerId"], team_id, player["firstName"]["default"], player["lastName"]["default"], player["positionCode"],
        player["gamesPlayed"], player["goals"], player["assists"], player["points"],
        player["plusMinus"], player["penaltyMinutes"], player["powerPlayGoals"], player["shorthandedGoals"],
        player["gameWinningGoals"], player["overtimeGoals"], player["shots"], player["shootingPctg"],
        player["avgTimeOnIcePerGame"], player["faceoffWinPctg"]
    ))

    connection.commit()
    cursor.close()
    connection.close()

def insert_goalie(goalie, team_id):
    """Insert or update a goalie's stats in MySQL."""
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO goalies (player_id, team_id, first_name, last_name, games_played, games_started, wins, losses,
                             overtime_losses, goals_against_avg, save_percentage, shots_against, saves, goals_against, shutouts)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            games_played = VALUES(games_played),
            games_started = VALUES(games_started),
            wins = VALUES(wins),
            losses = VALUES(losses),
            overtime_losses = VALUES(overtime_losses),
            goals_against_avg = VALUES(goals_against_avg),
            save_percentage = VALUES(save_percentage),
            shots_against = VALUES(shots_against),
            saves = VALUES(saves),
            goals_against = VALUES(goals_against),
            shutouts = VALUES(shutouts)
    """, (
        goalie["playerId"], team_id, goalie["firstName"]["default"], goalie["lastName"]["default"], goalie["gamesPlayed"],
        goalie["gamesStarted"], goalie["wins"], goalie["losses"], goalie["overtimeLosses"],
        goalie["goalsAgainstAverage"], goalie["savePercentage"], goalie["shotsAgainst"], goalie["saves"],
        goalie["goalsAgainst"], goalie["shutouts"]
    ))

    connection.commit()
    cursor.close()
    connection.close()

if __name__ == "__main__":
    for team in TEAM_ABBREVIATIONS:
        insert_team(team)
        team_id = get_team_id(team)

        if team_id:
            stats = fetch_team_stats(team)
            if stats:
                for player in stats.get("skaters", []):
                    insert_player(player, team_id)
                
                for goalie in stats.get("goalies", []):
                    insert_goalie(goalie, team_id)

    print("Data successfully uploaded to MySQL database.")

