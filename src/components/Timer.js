import React, { useState, useEffect } from "react";
import Countdown from "./Countdown";

function Timer(props) {
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  useEffect(() => {
    setSeconds(`${dateTime}`.slice(-5, -3));
  }, [dateTime]);

  // const getSeconds = `${dateTime}`.slice(-5, -3);
  // const minutes = `${Math.floor(dateTime / 60)}`;
  // const getMinutes = `0${minutes % 60}`.slice(-2);
  // const getHours = `0${Math.floor(dateTime / 3600)}`.slice(-2);

  return (
    <div className="timerContainer">
      {/* <span>Time: {dateTime.toLocaleTimeString()}</span> */}
      {/* <span>Date: {dateTime.toLocaleDateString()}</span> */}
      <span>{dateTime}</span>

      {/* <span>{getSeconds}</span> */}
      <span>{seconds}</span>
      {/* <span>{minutes}</span>
      <span>{getMinutes}</span>
      <span>{getHours}</span> */}

      <Countdown secondsPast={seconds} />
    </div>
  );
}

export default Timer;
