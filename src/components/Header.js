import React from "react";
import { FaMedal } from "react-icons/fa";
import Username from "./Username";
import Timer from "./Timer";

function Header({
  currentUserObj,
  setCurrentUserObj,
  progressPhase,
  setPhase,
  currentImageObj,
  phaseDuration,
  phase,
  URL,
}) {
  return (
    <div className="headerContainer">
      {!!currentImageObj.start_time && (
        <Timer
          progressPhase={progressPhase}
          setPhase={setPhase}
          currentImageObj={currentImageObj}
          phaseDuration={phaseDuration}
          phase={phase}
        />
      )}

      <div className="head-grid-item1">
        <h1 className="title">Second Guessed</h1>
        <h2>
          a game for the second-best <FaMedal />{" "}
        </h2>
      </div>

      <div className="head-grid-item2">
        <Username
          currentUserObj={currentUserObj}
          setCurrentUserObj={setCurrentUserObj}
          URL={URL}
        />
      </div>
    </div>
  );
}

export default Header;
