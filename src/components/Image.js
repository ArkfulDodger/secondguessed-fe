import React, { useState, useEffect } from "react";

function Image({ currentImageObj }) {
  // every 1-2min setSeed with current timestamp
  // reload random image using "https://picsum.photos/{seed}/1/200/300"

  return (
    <div className="imageContainer">
      <img
        src={currentImageObj.image_url}
        className="randomImage"
        alt="randomly generated"
      ></img>
    </div>
  );
}

export default Image;
