import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="hero">
                <div className="hero-content">
                    <img src="./logos/NHL_Stats_Icon.png" alt="NHL Logo" className="hero-logo" />
                    <h1>Welcome to NHL Stats</h1>
                    <p>Explore real-time stats, team details, and player performances across the NHL.</p>
                    <button onClick={() => navigate("/teams")}>Explore Teams</button>
                </div>
            </div>
        </div>
    );
}

export default Home;

