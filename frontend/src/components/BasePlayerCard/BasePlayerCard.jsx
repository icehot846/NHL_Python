import React from "react";
import "./BasePlayerCard.css";

const BasePlayerCard = ({ player, isGoalie }) => {
  return (
    <div className="player-card">
      <img
        src={player.headshot}
        alt={`${player.first_name} ${player.last_name}`}
      />
      <h4>
        {player.first_name} {player.last_name}
      </h4>
      <p>
        {player.position} | {player.team_abbr}
      </p>
      <p>
        {isGoalie ? "Wins:" : "Goals:"} {isGoalie ? player.wins : player.goals}
      </p>
    </div>
  );
};

export default BasePlayerCard;
