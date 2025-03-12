import React, { useEffect, useState } from "react";
import { fetchTeams } from "../services/api";
import { Link } from "react-router-dom";

function Teams() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("🔹 Teams.js is mounted"); // Debug log

        const getTeams = async () => {
            try {
                const data = await fetchTeams();
                console.log("API Response:", data); // Debugging log
                alert(`API Response: ${JSON.stringify(data)}`); // Show an alert with API response
                if (!data || data.length === 0) {
                    throw new Error("No teams found.");
                }
                setTeams(data);
            } catch (err) {
                console.error("Error fetching teams:", err);
                setError(err.message);
            }
            setLoading(false);
        };
        getTeams();
    }, []);

    if (loading) return <p>Loading teams...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!teams.length) return <p>No teams available.</p>;

    return (
        <div className="container">
            <h1>NHL Teams</h1>
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map((team) => (
                        <tr key={team.abbreviation}>
                            <td>{team.abbreviation}</td>
                            <td>
                                <Link to={`/teams/${team.abbreviation}`}>View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Teams;


