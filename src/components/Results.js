import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FiChevronsLeft } from "react-icons/fi";

function Results({
  currentUserObj,
  currentImageObj,
  currentGuessObj,
  URL,
  winningWordsIds,
  setWinningWordsIds,
}) {
  const [finalWordsList, setFinalWordsList] = useState([]);
  // const [winningWordsIds, setWinningWordsIds] = useState([]);
  const [winnersText, setWinnersText] = useState("");
  const [winnerPreface, setWinnerPreface] = useState("Winners:");

  useEffect(() => {
    fetch(`${URL}/final-words/${currentImageObj.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("-----results fetch called------");
        const words = JSON.parse(data.words);
        const winningWords = JSON.parse(data.winning_words);
        const winners = JSON.parse(data.winners);
        console.log("FINAL RETURN:", words, winningWords, winners);

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
        const winnerNames = !winners[0]
          ? "nobody"
          : winners.map((winner) => winner.name).join(", ");

        console.group("RESULTS");
        console.log("Winning Words:", winningIds);
        console.log("Winners:", winnerNames);
        console.log("Word Tallies:", finalWords);
        console.groupEnd();

        setFinalWordsList(finalWords);
        setWinningWordsIds(winningIds);
        setWinnersText(winnerNames);
        winners.length == 1
          ? setWinnerPreface("Winner:")
          : setWinnerPreface("Winners:");
      })
      .catch((error) => console.log(error.message));
  }, []);

  let yourWord = "";

  if (currentGuessObj) {
    yourWord = winningWordsIds.includes(currentGuessObj.word_id) ? (
      "⭐"
    ) : (
      <FiChevronsLeft />
    );
  }

  const displayList = finalWordsList.map((word, i) => {
    return (
      <tr key={i}>
        <td className="resultsTableCell">{word.text}</td>
        <td className="resultsTableCell voteCell">{word.guessCount}</td>
        <td className="resultsTableCell yourGuessCell">
          {currentGuessObj
            ? word.id === currentGuessObj.word_id && yourWord
            : ""}
        </td>
      </tr>
    );
  });

  return (
    <div className="resultsContainer grid-item10">
      <span className="winnersTextSpan">
        <b>{winnerPreface}</b> {"   "}
        {winnersText}
      </span>

      <table className="resultsTable">
        <tbody>
          <tr>
            <th className="column1">words:</th>
            <th className="column2">votes:</th>
            <th className="column3">yours:</th>
          </tr>
          {displayList}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
