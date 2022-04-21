import React, { useState } from "react";

function Word({
  currentImageObj,
  wordToSubmit,
  setWordToSubmit,
  currentUserObj,
  currentSubmission,
  setCurrentSubmission,
  URL,
}) {
  // state: submitted word this round & stop displaying input
  // const [submittedThisRound, setSubmittedThisRound] = useState(false);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

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

    const wordObj = {
      text: wordToSubmit,
      image_id: currentImageObj.id,
      user_id: currentUserObj.id,
    };

    if (isBeingEdited) {
      patchSubmission(wordObj);
    } else {
      postNewSubmission(wordObj);
    }

    // reset the form
    setWordToSubmit("");
    // }
  }

  function postNewSubmission(wordObj) {
    // add word to list of words IN DATABASE
    fetch(`${URL}/words`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(wordObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("submitted word to database!");
        // setSubmittedThisRound(true);
        setCurrentSubmission(data);
        setIsBeingEdited(false);
      })
      .catch((error) => console.log(error.message));
  }

  function patchSubmission(wordObj) {
    // update current submission IN DATABASE
    fetch(`${URL}/words/${currentImageObj.id}/${currentUserObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        text: wordObj.text,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("updated submitted word in database!");
        setCurrentSubmission(data);
        setIsBeingEdited(false);
      })
      .catch((error) => console.log(error.message));
  }

  // const inputClassName = submittedThisRound === false ? "" : "hidden";

  return (
    <div className="wordContainer grid-item10">
      {!currentSubmission || isBeingEdited ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            // className={inputClassName}
            name="word"
            value={wordToSubmit}
            onChange={(e) => setWordToSubmit(e.target.value)}
            placeholder="enter your word or phrase"
          ></input>
        </form>
      ) : (
        <div className="submittedWord">
          <span>You submitted:</span>
          <span>{currentSubmission.text}</span>

          {/* button to edit submission - brings back form */}
          {/* will this allow new submission to write over previous? */}
          <button onClick={() => setIsBeingEdited(true)}>
            edit submission
          </button>
        </div>
      )}
    </div>
  );
}

export default Word;
