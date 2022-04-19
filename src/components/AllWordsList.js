import React, { useState, useEffect } from "react";
import WordToGuess from "./WordToGuess";
import { v4 as uuidv4 } from "uuid";

function AllWordsList({ currentImageObj, wordToSubmit }) {
  const [wordsList, setWordsList] = useState([]);
  // GET words - eventually filter for only words from current game

  useEffect(() => {
    fetch(`http://localhost:9292/words/${currentImageObj.id}`)
      .then((res) => res.json())
      .then((listOfSubmittedWords) => setWordsList(listOfSubmittedWords))
      .catch((error) => console.log(error.message));
  }, [wordToSubmit]);

  const wordsToDisplay = wordsList.map((word) => (
    <WordToGuess word={word} key={uuidv4()} />
  ));
  return (
    <div className="allWordsListContainer">
      <span>Guessed Words:</span>
      <ul className="allWordsList">{wordsToDisplay}</ul>
    </div>
  );
}

export default AllWordsList;
