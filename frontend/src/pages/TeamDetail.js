import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTeamDetails } from "../services/api";
import teamNameMap from "../utils/teamNames";
import logoMap from "../assets/logoMap";


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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
        {/* Header with Logo and Team Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <img
            src={logoMap[teamData.team.abbreviation]}
            alt={`${teamData.team.name} logo`}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
          <h1 style={{ fontSize: "2.5rem", margin: 0 }}>
            {teamNameMap[teamData.team.abbreviation] || teamData.team.name}
            {" "}({teamData.team.abbreviation})
          </h1>
        </div>
      
        {/* Players Table */}
        <h2 style={{ alignSelf: "flex-start" }}>Players</h2>
        <div style={{ overflowX: "auto", width: "100%", display: "flex", justifyContent: "center" }}>
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
        </div>
      
        {/* Goalies Table */}
        <h2 style={{ alignSelf: "flex-start", marginTop: "2rem" }}>Goalies</h2>
        <div style={{ overflowX: "auto", width: "100%", display: "flex", justifyContent: "center" }}>
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
      </div>
      
    );
}

export default TeamDetail;