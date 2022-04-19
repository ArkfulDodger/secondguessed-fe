import React, { useState, useEffect } from "react";

function Results({ userIP, currentImageObj, currentGuessObj }) {
  const [finalWordsList, setFinalWordsList] = useState([]);
  const [winningWordsIds, setWinningWordsIds] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/final-words/${currentImageObj.id}`)
      .then((res) => res.json())
      .then((data) => {
        const words = JSON.parse(data.words);
        const winningWords = JSON.parse(data.winning_words);
        // console.log("FINAL RETURN:", words, winningWords);

        const finalWords = words
          .map((word) => {
            return {
              id: word.id,
              text: word.text,
              guessCount: word.guesses.length,
            };
          })
          .sort((a, b) => (b.guessCount > a.guessCount ? 1 : -1));
        const winningIds = winningWords.map((word) => word.id);

        console.log(finalWords);
        console.log(winningIds);

        setFinalWordsList(finalWords);
        setWinningWordsIds(winningIds);
      })
      .catch((error) => console.log(error.message));
  }, []);

  const winLossText = winningWordsIds.includes(currentGuessObj.word_id)
    ? "Congratulations! You guessed correctly"
    : "You lose, buster";

  const displayList = finalWordsList.map((word) => {
    return (
      <li key={word.id}>
        {word.text} - {word.guessCount}{" "}
        {word.id === currentGuessObj.word_id && "⭐️ this was yours!"}
      </li>
    );
  });

  return (
    <div className="results">
      <h2>{winLossText}</h2>
      <ol>{displayList}</ol>
    </div>
  );
}

export default Results;
