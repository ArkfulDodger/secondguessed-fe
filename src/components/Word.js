import React, { useState } from "react";

function Word({ currentImageObj, wordToSubmit, setWordToSubmit, userIP }) {
  // state: submitted word this round & stop displaying input
  const [submittedThisRound, setSubmittedThisRound] = useState(false);
  const [currentSubmission, setCurrentSubmission] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const testWordObj = {
      text: wordToSubmit,
      image_id: currentImageObj.id,
      user_ip: userIP,
    };

    // add word to list of words IN DATABASE
    console.log("Before POST", testWordObj);

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
        console.log("POST data: ", data);
        setSubmittedThisRound(true);
        setCurrentSubmission(data.text);
      })
      .catch((error) => console.log(error.message));

    // reset the form
    setWordToSubmit("");
  }

  const inputClassName = submittedThisRound === false ? "" : "hidden";

  return (
    <div className="word grid-item10">
      {submittedThisRound ? (
        <span>{currentSubmission}</span>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className={inputClassName}
            name="word"
            value={wordToSubmit}
            onChange={(e) => setWordToSubmit(e.target.value)}
          ></input>
        </form>
      )}
    </div>
  );
}

export default Word;
