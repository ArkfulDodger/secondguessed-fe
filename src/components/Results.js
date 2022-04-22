import React, { useState, useEffect } from "react";

function Results({ currentUserObj, currentImageObj, currentGuessObj, URL }) {
  const [finalWordsList, setFinalWordsList] = useState([]);
  const [winningWordsIds, setWinningWordsIds] = useState([]);
  const [winnersText, setWinnersText] = useState("");

  useEffect(() => {
    fetch(`${URL}/final-words/${currentImageObj.id}`)
      .then((res) => res.json())
      .then((data) => {
        const words = JSON.parse(data.words);
        const winningWords = JSON.parse(data.winning_words);
        const winners = JSON.parse(data.winners);
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
        const winnerNames = (winners = []
          ? "Nobody won this round!"
          : winners.map((winner) => winner.name).join(", "));

        console.group("RESULTS");
        console.log("Winning Words:", winningIds);
        console.log("Winners:", winnerNames);
        console.log("Word Tallies:", finalWords);
        console.groupEnd();

        setFinalWordsList(finalWords);
        setWinningWordsIds(winningIds);
        setWinnersText(winnerNames);
      })
      .catch((error) => console.log(error.message));
  }, []);

  let winLossText = "";

  if (currentGuessObj) {
    winLossText = winningWordsIds.includes(currentGuessObj.word_id)
      ? "You win!"
      : "You lose!";
  }

  const yourWord = "⭐️";

  const displayList = finalWordsList.map((word, i) => {
    return (
      // <li key={word.id}>
      //   {word.text} - {word.guessCount}{" "}
      //   {currentGuessObj ? word.id === currentGuessObj.word_id && yourWord : ""}
      // </li>

      <tr key={i}>
        <td className="resultsTableRow">
          {word.text} - {word.guessCount}
        </td>
        <td className="resultsTableRow">
          {currentGuessObj
            ? word.id === currentGuessObj.word_id && yourWord
            : ""}
        </td>
      </tr>
    );
  });

  return (
    <div className="resultsContainer grid-item10">
      <h2 className="winLossText">{winLossText}</h2>
      {/* <ol className="resultsList">{displayList}</ol> */}

      <table className="resultsTable">
        <tbody>
          <tr>
            <th className="column1">all words:</th>
            <th className="column2">your word:</th>
          </tr>
          {displayList}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
