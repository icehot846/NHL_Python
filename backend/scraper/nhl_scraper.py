import requests
import json

# NHL API endpoint for team stats (new API URL)
TEAM_STATS_URL = "https://api-web.nhle.com/v1/club-stats/{team_abbreviation}/now"

def fetch_team_stats(team_abbreviation):
    """Fetch NHL team stats from the new API."""
    response = requests.get(TEAM_STATS_URL.format(team_abbreviation=team_abbreviation))
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching data for {team_abbreviation}: {response.status_code}")
        return None

if __name__ == "__main__":
    team_abbr = "TOR"  # Example: Toronto Maple Leafs
    team_stats = fetch_team_stats(team_abbr)
    if team_stats:
        print(json.dumps(team_stats, indent=4))