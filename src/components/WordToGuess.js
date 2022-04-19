import React, { useState } from "react";

function WordToGuess({
  word,
  currentGuessObj,
  setCurrentGuessObj,
  currentImageObj,
  userIP,
}) {
  function handleClick() {
    setAsGuess();
  }

  function setAsGuess() {
    // create a new guess with word
    fetch(`http://localhost:9292/guesses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        image_id: currentImageObj.id,
        user_IP: userIP,
        word_id: word.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message));
  }

  return (
    <>
      <li>{word.text}</li>
    </>
  );
}

export default WordToGuess;
