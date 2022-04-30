import React from "react";

function SubmissionTally({ phase }) {
  const tallyNum =
    phase === "submit"
      ? "[num of submissions]"
      : phase === "vote"
      ? "[num of guesses]"
      : "";

  const tallyText =
    phase === "submit"
      ? `${tallyNum} words submitted!`
      : phase === "vote"
      ? `${tallyNum} votes cast!`
      : "";

  return (
    <div>
      <span>{tallyText}</span>
    </div>
  );
}

export default SubmissionTally;
