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
}) {
  return (
    <div className="phaseContentsContainer grid-item12">
      <Instructions phase={phase} />
      {phase === "submit" && (
        <Word
          currentImageObj={currentImageObj}
          wordToSubmit={wordToSubmit}
          setWordToSubmit={setWordToSubmit}
          currentUserObj={currentUserObj}
          currentSubmission={currentSubmission}
          setCurrentSubmission={setCurrentSubmission}
        />
      )}
      {phase === "vote" && (
        <AllWordsList
          currentImageObj={currentImageObj}
          wordToSubmit={wordToSubmit}
          currentGuessObj={currentGuessObj}
          setCurrentGuessObj={setCurrentGuessObj}
          currentUserObj={currentUserObj}
        />
      )}
      {phase === "results" && (
        <Results
          currentUserObj={currentUserObj}
          currentImageObj={currentImageObj}
          currentGuessObj={currentGuessObj}
        />
      )}
    </div>
  );
}

export default PhaseContents;
