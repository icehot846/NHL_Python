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
              <div className="player-card" key={player.id}>
                <img src={player.headshot} alt={`${player.firstName.default} ${player.lastName.default}`} />
                <div>
                  <h4>{player.firstName.default} {player.lastName.default}</h4>
                  <p>{player.position} | {player.teamAbbrev}</p>
                  <p>Goals: {player.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Goalies */}
        <div className="card">
          <h2>🥅 Top 5 Goalies (Wins)</h2>
          <div className="player-grid">
            {topGoalies.map((goalie) => (
              <div className="player-card" key={goalie.id}>
                <img src={goalie.headshot} alt={`${goalie.firstName.default} ${goalie.lastName.default}`} />
                <div>
                  <h4>{goalie.firstName.default} {goalie.lastName.default}</h4>
                  <p>{goalie.position} | {goalie.teamAbbrev}</p>
                  <p>Wins: {goalie.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;


