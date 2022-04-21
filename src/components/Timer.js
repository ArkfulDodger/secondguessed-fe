import React, { useState, useEffect } from "react";
import Countdown from "./Countdown";

function Timer({
  progressPhase,
  setPhase,
  currentImageObj,
  phaseDuration,
  phase,
}) {
  // Set state for the clock (dateTime) and countdown timer (secToNextPhase)
  const [dateTime, setDateTime] = useState(new Date().toLocaleString());
  const [secToNextPhase, setSecToNextPhase] = useState(
    secondsRemainingInPhase()
  );

  // setTimeout to update the Timer/Phase at the next second-marker
  useEffect(() => {
    const timer = setTimeout(() => {
      updateTimerAndPhase();
    }, 1000 - (Date.now() % 1000));

    return () => clearTimeout(timer);
  }, [secToNextPhase]);

  // update the clock/timer/phase
  function updateTimerAndPhase() {
    setDateTime(new Date().toLocaleString());
    const newSecondsRemaining = secondsRemainingInPhase();

    // checks if the newly calculated seconds remaining is higher than the
    // seconds remaining currently in state (prior to change)
    // if so, the phase needs to be progressed
    if (newSecondsRemaining > secToNextPhase) {
      progressPhase();
    }
    setSecToNextPhase(newSecondsRemaining);
  }

  // get seconds remaining in the current phase for the current image
  function secondsRemainingInPhase() {
    const timeSinceStart = Date.now() - currentImageObj.start_time;
    const timeIntoPhase = timeSinceStart % phaseDuration;
    const secsIntoPhase = Math.floor(timeIntoPhase / 1000);
    const secRemaining = phaseDuration / 1000 - secsIntoPhase;

    return secRemaining;
  }

  return (
    <div className="timerContainer head-grid-item4">
      {/* <span>{dateTime}</span> */}

      {/* <span>{secToNextPhase}</span> */}

      <Countdown
        secToNextPhase={secToNextPhase}
        progressPhase={progressPhase}
        setPhase={setPhase}
        phaseDuration={phaseDuration}
        phase={phase}
      />
    </div>
  );
}

export default Timer;
