import React, { useState } from "react";

function WordToGuess({
  word,
  currentGuessObj,
  setCurrentGuessObj,
  currentImageObj,
  currentUserObj,
  URL,
}) {
  function handleClick() {
    if (currentGuessObj) {
      if (word.id === currentGuessObj.word_id) {
        removeGuess();
      } else {
        updateGuess();
      }
    } else {
      setAsGuess();
    }
  }

  function removeGuess() {
    fetch(`${URL}/guesses/${currentGuessObj.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          console.log("removed guess!");
          setCurrentGuessObj(null);
        } else {
          alert("something went wrong");
        }
      })
      .catch((error) => alert(error.message));
  }

  function updateGuess() {
    console.log("updated guess!");

    const updatedGuessObj = { ...currentGuessObj, word_id: word.id };

    fetch(`${URL}/guesses/${currentGuessObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedGuessObj),
    })
      .then((res) => res.json())
      .then((returnedGuessObj) => {
        console.log(returnedGuessObj);
        setCurrentGuessObj(returnedGuessObj);
      })
      .catch((error) => console.log(error.message));
  }

  function setAsGuess() {
    const submittedGuess = {
      image_id: currentImageObj.id,
      user_id: currentUserObj.id,
      word_id: word.id,
    };

    // create a new guess with word
    fetch(`${URL}/guesses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(submittedGuess),
    })
      .then((res) => res.json())
      .then((guessObj) => {
        console.log("submitted new guess!");
        setCurrentGuessObj(guessObj);
      })
      .catch((error) => console.log(error.message));
  }

  const selectedWordStyle = currentGuessObj
    ? word.id === currentGuessObj.word_id
      ? "btn selectedWordBtn"
      : "btn unselectedWordBtn"
    : "btn unselectedWordBtn";

  return (
    <>
      <button className={selectedWordStyle} onClick={handleClick}>
        {word.text}
      </button>
    </>
  );
}

export default WordToGuess;
