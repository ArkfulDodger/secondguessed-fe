import React, { useState, useEffect } from "react";

function Countdown({ secToNextPhase, phase }) {
  const seconds = String(secToNextPhase % 60).padStart(2, 0);
  const minutes = String(Math.floor(secToNextPhase / 60)).padStart(2, 0);

  return (
    <div className="countdownContainer">
      <h2>Current Phase </h2>
      <h3>{phase}</h3>
      <div>
        Time remaining in phase:{" "}
        <b>
          {" "}
          {minutes}:{seconds}{" "}
        </b>
      </div>
    </div>
  );
}

export default Countdown;
