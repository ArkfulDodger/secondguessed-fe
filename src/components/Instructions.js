import React, { useState } from "react";

function Instructions({ phase }) {
  // if it's time to guess: "Please write the word that you think best describes the image above"

  // if it's time to choose a guess: "Please choose the best-fitting word from the options below"

  // can't vote more than once. But you CAN vote for your own word.
  // cap the number of words that were submitted: only display 5-10
  return (
    <div className="instructions grid-item4">
      <span>
        {phase === "submit" &&
          "Write a word or phrase that describes the image"}
        {phase === "vote" &&
          "Choose the word you think will receive the SECOND-most votes"}
        {phase === "results" && "Results:"}
      </span>
    </div>
  );
}

export default Instructions;
