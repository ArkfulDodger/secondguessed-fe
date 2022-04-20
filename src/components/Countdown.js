import React, { useState, useEffect } from "react";

function Countdown({ secondsPast }) {
  const [countDown, setCountDown] = React.useState(0);
  const [runTimer, setRunTimer] = React.useState(false);

  // function startCountdown() {
  //     let timerId;

  //     if (runTimer) {
  //       setCountDown(60);
  //       timerId = setInterval(() => {
  //         setCountDown((countDown) => countDown - 1);
  //       }, 1000);
  //     } else {
  //       clearInterval(timerId);
  //     }

  //     return () => clearInterval(timerId);
  // }

  useEffect(() => {
    let timerId;

    if (runTimer) {
      setCountDown(60);
      timerId = setInterval(() => {
        setCountDown((countDown) => countDown - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [runTimer]);

  useEffect(() => {
    if (secondsPast === "00") {
      console.log("secondsPast is 00");

      setRunTimer(true);

      let timerId;

      if (runTimer) {
        setCountDown(60);
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
    <div className="App">
      <div>
        Time remaining: {minutes}:{seconds}
      </div>
    </div>
  );
}

export default Countdown;
