import React, { useState, useEffect } from "react";

function Countdown({ secToNextPhase, phase }) {
  const seconds = String(secToNextPhase % 60).padStart(2, 0);
  const minutes = String(Math.floor(secToNextPhase / 60)).padStart(2, 0);

  const timerText =
    phase === "submit"
      ? "until voting begins"
      : phase === "vote"
      ? "left to vote"
      : "until next round begins";

  return (
    <div className="countdownContainer">
      <h1>
        {minutes}:{seconds}
      </h1>
      <h3>{timerText}</h3>
    </div>
  );
}

export default Countdown;
