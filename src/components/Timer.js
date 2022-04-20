import React, { useState, useEffect } from "react";
import Countdown from "./Countdown";

function Timer({ progressPhase, setPhase, currentImageObj, phaseDuration }) {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [secondsPast, setSecondsPast] = useState(0);
  const [secToNextPhase, setSecToNextPhase] = useState(
    secondsRemainingInPhase()
  );

  // console.log("imgObj:", currentImageObj);

  useEffect(() => {
    let secTimer;
    let timerStart = setTimeout(() => {
      secTimer = setInterval(() => {
        setDateTime(new Date().toLocaleString());
        const newSecondsRemaining = secondsRemainingInPhase();
        console.log("secToNextPhase", secToNextPhase);
        console.log("newRemaining", newSecondsRemaining);
        if (secToNextPhase < newSecondsRemaining) {
          progressPhase();
        }
        setSecToNextPhase(newSecondsRemaining);
      }, 1000);
    }, 1000 - (Date.now() % 1000));

    return () => {
      clearTimeout(timerStart);
      secTimer && clearInterval(secTimer);
    };
  }, []);

  function secondsRemainingInPhase() {
    const timeSinceStart = Date.now() - currentImageObj.start_time;
    const timeIntoPhase = timeSinceStart % phaseDuration;
    const secsIntoPhase = Math.floor(timeIntoPhase / 1000);
    const secRemaining = phaseDuration / 1000 - secsIntoPhase;

    // console.group("secRemaining Logs");
    // console.log("imgObj:", currentImageObj);
    // console.log("timeSinceStart:", timeSinceStart);
    // console.log("timeIntoPhase:", timeIntoPhase);
    // console.log("secsIntoPhase:", secsIntoPhase);
    // console.log("secRemaining:", secRemaining);
    // console.groupEnd();

    return secRemaining;
  }

  // useEffect(() => {
  //   setSecondsPast(`${dateTime}`.slice(-5, -3));
  // }, [dateTime]);

  // const getSecondsPast = `${dateTime}`.slice(-5, -3);
  // const minutes = `${Math.floor(dateTime / 60)}`;
  // const getMinutes = `0${minutes % 60}`.slice(-2);
  // const getHours = `0${Math.floor(dateTime / 3600)}`.slice(-2);

  return (
    <div className="timerContainer grid-item2">
      <span>{dateTime}</span>

      {/* <span>{secToNextPhase}</span> */}

      <Countdown
        secToNextPhase={secToNextPhase}
        progressPhase={progressPhase}
        setPhase={setPhase}
        phaseDuration={phaseDuration}
      />
    </div>
  );
}

export default Timer;
