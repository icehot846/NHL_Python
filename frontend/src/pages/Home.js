import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate(); // ✅ useNavigate inside a functional component

    return (
        <div className="container">
            <h1>Welcome to NHL Stats</h1>
            <p>Explore team and player statistics for the current season.</p>
            <button onClick={() => navigate("/teams")}>View Teams</button>
        </div>
    );
}

export default Home;

