import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTopScorers, fetchTopGoalies } from "../services/api";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [topScorers, setTopScorers] = useState([]);
  const [topGoalies, setTopGoalies] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const scorers = await fetchTopScorers();
        const goalies = await fetchTopGoalies();
        setTopScorers(scorers);
        setTopGoalies(goalies);
      } catch (err) {
        console.error("Error loading stats:", err);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <img
            src={require("../assets/logos/NHL_Stats_Icon.png")}
            alt="NHL Logo"
            className="hero-logo"
          />
          <h1>Welcome to NHL Stats</h1>
          <p>Explore real-time stats, team details, and player performances across the NHL.</p>
          <button onClick={() => navigate("/teams")}>Explore Teams</button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        {/* Top Scorers */}
        <div className="card">
          <h2>🏒 Top 5 Goal Scorers</h2>
          <div className="player-grid">
            {topScorers.map((player) => (
              <div className="player-card" key={player.player_id}>
                <img src={player.headshot} alt={`${player.first_name} ${player.last_name}`} />
                <h4>{player.first_name} {player.last_name}</h4>
                <p>{player.position} | {player.team_abbr}</p>
                <p>Goals: {player.goals}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Goalies */}
        <div className="card">
          <h2>🥅 Top 5 Goalies (Wins)</h2>
          <div className="player-grid">
            {topGoalies.map((goalie) => (
              <div className="player-card" key={goalie.player_id}>
                <img src={goalie.headshot} alt={`${goalie.first_name} ${goalie.last_name}`} />
                <h4>{goalie.first_name} {goalie.last_name}</h4>
                <p>{goalie.position} | {goalie.team_abbr}</p>
                <p>Wins: {goalie.wins}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;



