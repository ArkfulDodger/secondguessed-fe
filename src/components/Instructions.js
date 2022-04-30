import React, { useEffect } from "react";

function Instructions({
  currentGuessObj,
  phase,
  winningWordsIds,
  youWon,
  setYouWon,
}) {
  useEffect(() => {
    if (currentGuessObj === null) {
      console.log("currentGuessObj NULL");
    } else if (currentGuessObj) {
      winningWordsIds.includes(currentGuessObj.word_id)
        ? setYouWon(true)
        : setYouWon(false);
    }
  }, []);

  const winLossText = youWon ? "You win!" : "You lose!";
  let textStyle = phase === "results" ? "instructions gameEnd" : "instructions";

  return (
    <div className="instructionsContainer grid-item2">
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
