import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/teams">Teams</Link></li>
                <li><Link to="/players">Players</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;