import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTeamDetails } from "../services/api";
import teamNameMap from "../utils/teamNames";

function TeamDetail() {
    const { teamAbbr } = useParams();
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTeamData = async () => {
            const data = await fetchTeamDetails(teamAbbr);
            setTeamData(data);
            setLoading(false);
        };
        getTeamData();
    }, [teamAbbr]);

    if (loading) return <p>Loading team details...</p>;
    if (!teamData) return <p>Team not found.</p>;

    return (
        <div>
            <h1>
                {teamNameMap[teamData.team.abbreviation] || teamData.team.name}
                {" "}
                ({teamData.team.abbreviation})
            </h1>
            <h2>Players</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Games Played</th>
                        <th>Goals</th>
                        <th>Assists</th>
                        <th>Points</th>
                    </tr>
                </thead>
                <tbody>
                    {teamData.players.map((player) => (
                        <tr key={player.player_id}>
                            <td>{player.first_name} {player.last_name}</td>
                            <td>{player.position}</td>
                            <td>{player.games_played}</td>
                            <td>{player.goals}</td>
                            <td>{player.assists}</td>
                            <td>{player.points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Goalies</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Games Played</th>
                        <th>Wins</th>
                        <th>Losses</th>
                        <th>Save %</th>
                        <th>GAA</th>
                    </tr>
                </thead>
                <tbody>
                    {teamData.goalies.map((goalie) => (
                        <tr key={goalie.player_id}>
                            <td>{goalie.first_name} {goalie.last_name}</td>
                            <td>{goalie.games_played}</td>
                            <td>{goalie.wins}</td>
                            <td>{goalie.losses}</td>
                            <td>{goalie.save_percentage}</td>
                            <td>{goalie.goals_against_avg}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeamDetail;