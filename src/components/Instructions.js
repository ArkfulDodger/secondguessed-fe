import React, { useState } from "react";

function Instructions({ currentGuessObj, phase, winningWordsIds }) {
  // if it's time to guess: "Please write the word that you think best describes the image above"

  // if it's time to choose a guess: "Please choose the best-fitting word from the options below"

  // can't vote more than once. But you CAN vote for your own word.
  // cap the number of words that were submitted: only display 5-10

  let winLossText = "";

  if (currentGuessObj === null) {
    console.log("currentGuessObj NULL");
    winLossText = "No guess was made";
  } else if (currentGuessObj) {
    winLossText = winningWordsIds.includes(currentGuessObj.word_id)
      ? "You win!"
      : "You lose!";
  }

  let textStyle = phase === "results" ? "instructions gameEnd" : "instructions";

  return (
    <div className="instructionsContainer grid-item4">
      {/* <span className={textStyle}>
        {phase === "submit" &&
          "Write a word or phrase that describes the image"}
        {phase === "vote" &&
          "Choose the word you think will receive the <b>SECOND</b>-most votes"}
        {phase === "results" && winLossText}
      </span> */}
      {phase === "submit" ? (
        <span className={textStyle}>
          Write a word or phrase that describes the image
        </span>
      ) : phase === "vote" ? (
        <span className={textStyle}>
          Choose the word you think will receive the <b>SECOND</b>-most votes
        </span>
      ) : (
        phase === "results" && <span className={textStyle}>{winLossText}</span>
      )}
    </div>
  );
}

export default Instructions;
