import React, { useState, useEffect } from "react";
import WordToGuess from "./WordToGuess";
import { v4 as uuidv4 } from "uuid";

function AllWordsList({
  currentImageObj,
  wordToSubmit,
  currentGuessObj,
  setCurrentGuessObj,
  currentUserObj,
  URL,
}) {
  const [wordsList, setWordsList] = useState([]);
  // GET words - eventually filter for only words from current game

  useEffect(() => {
    fetch(`${URL}/words/${currentImageObj.id}`)
      .then((res) => res.json())
      .then((listOfSubmittedWords) => setWordsList(listOfSubmittedWords))
      .catch((error) => console.log(error.message));
  }, [wordToSubmit]);

  const wordsToDisplay = wordsList.map((word) => (
    <WordToGuess
      word={word}
      key={uuidv4()}
      currentGuessObj={currentGuessObj}
      setCurrentGuessObj={setCurrentGuessObj}
      currentImageObj={currentImageObj}
      currentUserObj={currentUserObj}
      URL={URL}
    />
  ));
  return (
    <div className="allWordsListContainer grid-item10">
      <span>Submitted Words:</span>
      <ul className="allWordsList">{wordsToDisplay}</ul>
    </div>
  );
}

export default AllWordsList;
