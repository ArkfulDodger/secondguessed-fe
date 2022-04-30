import React from "react";

function Image({ currentImageObj }) {
  // every 1-2min setSeed with current timestamp
  // reload random image using "https://picsum.photos/{seed}/1/200/300"

  return (
    <div className="imageContainer grid-item1">
      <img
        src={currentImageObj.url}
        className="randomImage"
        alt={currentImageObj.alt}
      ></img>
    </div>
  );
}

export default Image;
