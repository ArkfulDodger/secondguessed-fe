import React, { useState } from "react";
import { FaMedal } from "react-icons/fa";
import Username from "./Username";

function Header({ currentUserObj, setCurrentUserObj, progressPhase }) {
  return (
    <div className="headerContainer">
      <div className="head-grid-item3">
        <div className="phaseBtnContainer">
          <button onClick={progressPhase} className="temp-grid-item">
            click to progress phase
          </button>
        </div>
      </div>
      <div className="head-grid-item1">
        <h1>Second Guessed</h1>
        <h2>
          a game for the second-best <FaMedal />{" "}
        </h2>
      </div>

      <div className="head-grid-item2">
        <Username
          currentUserObj={currentUserObj}
          setCurrentUserObj={setCurrentUserObj}
        />
      </div>
    </div>
  );
}

export default Header;
