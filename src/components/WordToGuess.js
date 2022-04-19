import React, { useState } from "react";

function WordToGuess({ word }) {
  return (
    <>
      <li>{word.text}</li>
    </>
  );
}

export default WordToGuess;
