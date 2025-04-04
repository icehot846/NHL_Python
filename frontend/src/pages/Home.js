import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTopScorers, fetchTopGoalies } from "../services/api";
import BasePlayerContainer from "../components/BasePlayerContainer/BasePlayerContainer";
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
      {/* You can see that this makes your Home page a lot more manageable.
      And if you need to update the cards/container, you can do it in one place */}
      <BasePlayerContainer players={topScorers} title={"🏒 Top 5 Goal Scorers"}/>
      <BasePlayerContainer players={topGoalies} title={"🥅 Top 5 Goalies (Wins)"} isGoalies={true}/>
    </div>
  );
}

export default Home;



