import React, { useState } from "react";

function Instructions(props) {
  // if it's time to guess: "Please write the word that you think best describes the image above"

  // if it's time to choose a guess: "Please choose the best-fitting word from the options below"

  // can't vote more than once. But you CAN vote for your own word.
  // cap the number of words that were submitted: only display 5-10
  return (
    <div className="instructions">
      <span>
        Please write the word that you think best describes the image above
      </span>
    </div>
  );
}

export default Instructions;
