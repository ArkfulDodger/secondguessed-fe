import React, { useState } from "react";
import Instructions from "./Instructions";
import Word from "./Word";
import AllWordsList from "./AllWordsList";
import Results from "./Results";

function PhaseContents({
  phase,
  currentImageObj,
  wordToSubmit,
  setWordToSubmit,
  currentUserObj,
  currentSubmission,
  setCurrentSubmission,
  currentGuessObj,
  setCurrentGuessObj,
  URL,
}) {
  const [winningWordsIds, setWinningWordsIds] = useState([]);
  const [youWon, setYouWon] = useState(false);

  return (
    <div className="phaseContentsContainer grid-item12">
      <Instructions
        phase={phase}
        currentGuessObj={currentGuessObj}
        winningWordsIds={winningWordsIds}
        youWon={youWon}
        setYouWon={setYouWon}
      />
      {phase === "submit" && (
        <Word
          currentImageObj={currentImageObj}
          wordToSubmit={wordToSubmit}
          setWordToSubmit={setWordToSubmit}
          currentUserObj={currentUserObj}
          currentSubmission={currentSubmission}
          setCurrentSubmission={setCurrentSubmission}
          URL={URL}
        />
      )}
      {phase === "vote" && (
        <AllWordsList
          currentImageObj={currentImageObj}
          wordToSubmit={wordToSubmit}
          currentGuessObj={currentGuessObj}
          setCurrentGuessObj={setCurrentGuessObj}
          currentUserObj={currentUserObj}
          URL={URL}
        />
      )}
      {phase === "results" && (
        <Results
          currentUserObj={currentUserObj}
          currentImageObj={currentImageObj}
          currentGuessObj={currentGuessObj}
          URL={URL}
          winningWordsIds={winningWordsIds}
          setWinningWordsIds={setWinningWordsIds}
          youWon={youWon}
          setYouWon={setYouWon}
        />
      )}
    </div>
  );
}

export default PhaseContents;
