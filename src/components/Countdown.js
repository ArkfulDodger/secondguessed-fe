import React, { useState, useEffect } from "react";

function Countdown({ secondsPast, progressPhase, phase }) {
  // need to know which phase on page load & initialize countDown to secondsLeftInRound
  const roundDuration = 30;
  const secondsLeftInRound = roundDuration - (secondsPast % roundDuration);

  const [countDown, setCountDown] = React.useState(secondsLeftInRound);
  const [runTimer, setRunTimer] = React.useState(true);

  // 00:00:00 start daily cycle, then calculate mathematically where in current phase ??

  // automatically starts countdown on pageLoad:
  useEffect(() => {
    if (secondsPast === "00" || secondsPast === "30") {
      console.log("secondsPast: ", secondsPast);

      //   progressPhase();
      setRunTimer(true);

      let timerId;

      if (runTimer) {
        setCountDown(secondsLeftInRound);
        timerId = setInterval(() => {
          setCountDown((countDown) => countDown - 1);
        }, 1000);
      } else {
        clearInterval(timerId);
      }

      return () => clearInterval(timerId);
    }
  }, [secondsPast, runTimer]);

  const seconds = String(secondsLeftInRound % 60).padStart(2, 0);
  const minutes = String(Math.floor(secondsLeftInRound / 60)).padStart(2, 0);

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
