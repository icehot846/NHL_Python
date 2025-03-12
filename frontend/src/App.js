import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Navbar from "./components/Navbar";

function App() {
    return (
        <Routes> {/* ✅ Remove extra <Router>, keep only <Routes> */}
            <Route path="/" element={<Home />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:teamAbbr" element={<TeamDetail />} />
        </Routes>
    );
}

export default App;
