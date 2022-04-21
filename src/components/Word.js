import React, { useState } from "react";

function Word({
  currentImageObj,
  wordToSubmit,
  setWordToSubmit,
  currentUserObj,
}) {
  // state: submitted word this round & stop displaying input
  const [submittedThisRound, setSubmittedThisRound] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // validate that input is not empty
    // if (currentSubmission === "") {
    //   alert("please enter a word or phrase");
    // } else {
    //   const testWordObj = {
    //     text: wordToSubmit,
    //     image_id: currentImageObj.id,
    //     session_id: currentUserObj.session_id,
    //   };

    const testWordObj = {
      text: wordToSubmit,
      image_id: currentImageObj.id,
      user_id: currentUserObj.id,
    };

    // add word to list of words IN DATABASE
    fetch(`http://localhost:9292/words`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(testWordObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("submitted word to database!");
        setSubmittedThisRound(true);
        setCurrentSubmission(data.text);
      })
      .catch((error) => console.log(error.message));

    // reset the form
    setWordToSubmit("");
    // }
  }

  const inputClassName = submittedThisRound === false ? "" : "hidden";

  return (
    <div className="wordContainer grid-item10">
      {submittedThisRound === false ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className={inputClassName}
            name="word"
            value={wordToSubmit}
            onChange={(e) => setWordToSubmit(e.target.value)}
            placeholder="enter your word or phrase"
          ></input>
        </form>
      ) : (
        <div className="submittedWord">
          <span>You submitted:</span>
          <span>{currentSubmission}</span>

          {/* button to edit submission - brings back form */}
          {/* will this allow new submission to write over previous? */}
          <button onClick={() => setSubmittedThisRound(false)}>
            edit submission
          </button>
        </div>
      )}
    </div>
  );
}

export default Word;
