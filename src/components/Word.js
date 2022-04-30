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
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

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
        if (data === "TAKEN!") {
          alert("Word already submitted by another user, try another!");
        } else {
          console.log("submitted word to database!");
          // setSubmittedThisRound(true);
          setCurrentSubmission(data);
          setIsBeingEdited(false);
        }
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
        if (data === "TAKEN!") {
          alert("Word already submitted by another user, try another!");
        } else {
          console.log("updated submitted word in database!");
          setCurrentSubmission(data);
          setIsBeingEdited(false);
        }
      })
      .catch((error) => console.log(error.message));
  }

  function handleEditSubmitClick() {
    setWordToSubmit(currentSubmission.text);
    setIsBeingEdited(true);
  }

  return (
    <div className="wordContainer grid-item10">
      {!currentSubmission || isBeingEdited ? (
        <div className="formContainer">
          <form className="wordForm" onSubmit={(e) => handleSubmit(e)}>
            <input
              className="wordInput"
              name="word"
              value={wordToSubmit}
              onChange={(e) => setWordToSubmit(e.target.value)}
              placeholder="type here"
            ></input>
            <input type="submit" value="Submit" className="btn submitBtn" />
          </form>
        </div>
      ) : (
        <div className="submittedWord">
          <span>You submitted:</span>
          <span className="currentSubmissionText">
            <b>{currentSubmission.text}</b>
          </span>

          <button
            className="btn editSubmissionBtn"
            onClick={handleEditSubmitClick}
          >
            edit submission
          </button>
        </div>
      )}
    </div>
  );
}

export default Word;
