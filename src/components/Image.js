import React, { useState, useEffect } from "react";

function Image(props) {
  const [image, setImage] = useState();
  // need to get random image from API and display on page
  //   useEffect(() => {
  //     fetch(`https://picsum.photos/seed/picsum/200/300`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setImage(data);
  //       })
  //       .catch((error) => console.log(error.message));
  //   }, []);

  return (
    <div className="imageContainer">
      {/* <span>image</span> */}
      <img src="https://picsum.photos/200/300" className="randomImage"></img>
    </div>
  );
}

export default Image;
