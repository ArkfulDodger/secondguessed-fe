import React, { useState, useEffect } from "react";
import Countdown from "./Countdown";

function Timer({ progressPhase, phase }) {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [secondsPast, setSecondsPast] = useState("");

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  useEffect(() => {
    setSecondsPast(`${dateTime}`.slice(-5, -3));
  }, [dateTime]);

  // const getSecondsPast = `${dateTime}`.slice(-5, -3);
  // const minutes = `${Math.floor(dateTime / 60)}`;
  // const getMinutes = `0${minutes % 60}`.slice(-2);
  // const getHours = `0${Math.floor(dateTime / 3600)}`.slice(-2);

  return (
    <div className="timerContainer grid-item2">
      <span>{dateTime}</span>

      {/* <span>{secondsPast}</span> */}

      <Countdown
        secondsPast={secondsPast}
        progressPhase={progressPhase}
        phase={phase}
      />
    </div>
  );
}

export default Timer;
