import React, { useState, useEffect } from "react";

function Countdown({ secToNextPhase, progressPhase, phaseDuration }) {
  // need to know which phase on page load & initialize countDown to secondsLeftInRound
  // const [countDown, setCountDown] = React.useState(secToNextPhase);
  // const [runTimer, setRunTimer] = React.useState(true);

  // 00:00:00 start daily cycle, then calculate mathematically where in current phase ??

  // automatically starts countdown on pageLoad:
  // useEffect(() => {
  //   if (secondsPast === "00" || secondsPast === "30") {
  //     console.log("secondsPast: ", secondsPast);

  //     progressPhase();
  //     setRunTimer(true);

  //     let timerId;

  //     if (runTimer) {
  //       setCountDown(secToNextPhase);
  //       timerId = setInterval(() => {
  //         setCountDown((countDown) => countDown - 1);
  //       }, 1000);
  //     } else {
  //       clearInterval(timerId);
  //     }

  //     return () => clearInterval(timerId);
  //   }
  // }, [secondsPast, runTimer]);

  const seconds = String(secToNextPhase % 60).padStart(2, 0);
  const minutes = String(Math.floor(secToNextPhase / 60)).padStart(2, 0);

  return (
    <div className="countdownContainer">
      <div>
        Time remaining in phase: {minutes}:{seconds}
      </div>
    </div>
  );
}

export default Countdown;
