import React from "react";
import BasePlayerCard from "../BasePlayerCard/BasePlayerCard";

const BasePlayerContainer = ({ players, isGoalies = false, title }) => {
  // there is probably a better way to figure out if it is a goalie or not, 
  // but for now this will work 
  return (
    <div className="c-player-card-container">
      <h2>{{ title }}</h2>
      <div className="c-player-grid">
        {players.map((player) => (
          <BasePlayerCard player={player} isGoalie={isGoalies} />
        ))}
      </div>
    </div>
  );
};

export default BasePlayerContainer;
