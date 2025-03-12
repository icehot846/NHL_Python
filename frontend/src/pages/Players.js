import React, { useEffect, useState } from "react";
import { fetchTeamDetails } from "../services/api";

function Players() {
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPlayersAndTeams = async () => {
            const playersData = await fetchPlayers();
            const teamsData = await fetchTeams();
            
            // Create a mapping of team_id to team name
            const teamMap = {};
            teamsData.forEach(team => {
                teamMap[team.id] = team.name;
            });
            
            setTeams(teamMap);
            setPlayers(playersData);
            setLoading(false);
        };
        getPlayersAndTeams();
    }, []);

    if (loading) return <p>Loading players...</p>;

    return (
        <div>
            <h1>NHL Players</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Team</th>
                        <th>Position</th>
                        <th>Games Played</th>
                        <th>Goals</th>
                        <th>Assists</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player.id}>
                            <td>{player.name}</td>
                            <td>{teams[player.team_id] || "Unknown"}</td>
                            <td>{player.position}</td>
                            <td>{player.games_played}</td>
                            <td>{player.goals}</td>
                            <td>{player.assists}</td>
                            <td>{player.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Players;