import React, { useState, useEffect } from "react";

function Countdown({ secondsPast, progressPhase }) {
  const roundDuration = 30;
  const secondsLeftInRound = roundDuration - (secondsPast % roundDuration);

  // 00:00:00 start daily cycle, then calculate mathematically where in current phase

  //   console.log("secondsLeftInRound: ", secondsLeftInRound);

  const [countDown, setCountDown] = React.useState(secondsLeftInRound);
  const [runTimer, setRunTimer] = React.useState(true);

  //   console.log("countDown: ", countDown);

  // need to know what phase, on page load
  // initialize first timer to current secondsPast and countdown til next 00 or 30
  // if we're 10s in, intitialize to 20s...

  //   console.log(secondsLeftInRound);

  // function startCountdown() {
  //     let timerId;

  //     if (runTimer) {
  //       setCountDown(30);
  //       timerId = setInterval(() => {
  //         setCountDown((countDown) => countDown - 1);
  //       }, 1000);
  //     } else {
  //       clearInterval(timerId);
  //     }

  //     return () => clearInterval(timerId);
  // }

  // keeps counting down based on runTimer
  //   useEffect(() => {
  //     let timerId;

  //     if (runTimer) {
  //       setCountDown(secondsLeftInRound);
  //       timerId = setInterval(() => {
  //         setCountDown((countDown) => countDown - 1);
  //       }, 1000);
  //     } else {
  //       clearInterval(timerId);
  //     }

  //     return () => clearInterval(timerId);
  //   }, [runTimer]);

  // automatically starts countdown at start of new minute
  useEffect(() => {
    if (secondsPast === "00") {
      console.log("secondsPast is 00");

      // change phase state when timer resets
      progressPhase();
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
    } else if (secondsPast === "30") {
      console.log("secondsPast is 30");

      // change phase state when timer resets
      progressPhase();
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
      <div>
        Time remaining in phase: {minutes}:{seconds}
      </div>
    </div>
  );
}

export default Countdown;
