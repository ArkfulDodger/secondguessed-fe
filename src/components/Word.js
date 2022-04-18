import React, { useState } from "react";

function Word({ currentImageObj }) {
  const [wordToGuess, setWordToGuess] = useState("");
  const [userIP, setUserIP] = useState("000.000.0.0");

  // state: submitted word this round & stop displaying input
  const [submittedThisRound, setSubmittedThisRound] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const testWordObj = {
      text: wordToGuess,
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
      })
      .catch((error) => console.log(error.message));

    // reset the form
    setWordToGuess("");
  }

  const inputClassName = submittedThisRound === false ? "" : "hidden";

  return (
    <div className="word">
      <span>word</span>

      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className={inputClassName}
          name="word"
          value={wordToGuess}
          onChange={(e) => setWordToGuess(e.target.value)}
        ></input>
      </form>
    </div>
  );
}

export default Word;
