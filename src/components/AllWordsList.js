import React, { useState } from "react";

function AllWordsList({ currentImageObj }) {
  // GET words - eventually filter for only words from current game

  fetch(`http://localhost:9292/words/${currentImageObj.id}`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error.message));
  return (
    <div className="allWordsList">
      <span>all words list</span>
    </div>
  );
}

export default AllWordsList;
