import React from "react";
import { useNavigate } from "react-router-dom";
import './Home.css';

function Home() {
    const navigate = useNavigate(); // ✅ useNavigate inside a functional component

    return (
        <div className="hero">
            <h1>Welcome to NHL Stats</h1>
            <p>Explore real-time stats across all NHL teams and players.</p>
            <image "url" 
            <button onClick={() => navigate("/teams")}>Explore Teams</button>
        </div>
      
    );
}

export default Home;

