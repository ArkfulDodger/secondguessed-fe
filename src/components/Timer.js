import React, { useState, useEffect } from "react";

function Timer(props) {
  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  return (
    <div className="timerContainer">
      <span>{dt}</span>
    </div>
  );
}

export default Timer;
