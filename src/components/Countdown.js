import React, { useState, useEffect } from "react";

function Countdown({ secondsPast, progressPhase }) {
  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);

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
  useEffect(() => {
    //   startCountdown()
    let timerId;

    if (runTimer) {
      setCountDown(30);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  // automatically starts countdown at start of new minute
  useEffect(() => {
    if (secondsPast === "00") {
      console.log("secondsPast is 00");

      // change phase state when timer resets
      progressPhase();
      setRunTimer(true);

      let timerId;

      if (runTimer) {
        setCountDown(30);
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
        setCountDown(30);
        timerId = setInterval(() => {
          setCountDown((countDown) => countDown - 1);
        }, 1000);
      } else {
        clearInterval(timerId);
      }

      return () => clearInterval(timerId);
    }
  }, [secondsPast, runTimer]);

  const seconds = String(countDown % 60).padStart(2, 0);
  const minutes = String(Math.floor(countDown / 60)).padStart(2, 0);

  return (
    <div className="countdownContainer">
      <div>
        Time remaining in phase: {minutes}:{seconds}
      </div>
    </div>
  );
}

export default Countdown;
