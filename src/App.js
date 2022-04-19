import logo from "./logo.svg";
import "./App.css";
import react, { useState, useEffect } from "react";
import Header from "./components/Header";
import AllWordsList from "./components/AllWordsList";
import Image from "./components/Image";
import Instructions from "./components/Instructions";
import Timer from "./components/Timer";
import Word from "./components/Word";
import Results from "./Results";
import Footer from "./components/Footer";

function App() {
  const [userIP, setUserIP] = useState("000.000.0.0");

  const [phase, setPhase] = useState("submit");
  // phases: submit, vote, results
  // conditional checks which phase & displays correct component
  // first: manually write code to change phases
  // next: set up to change on timer

  const [currentImageObj, setCurrentImageObj] = useState({
    id: 1,
    image_url:
      "https://d2u3kfwd92fzu7.cloudfront.net/asset/cms/Art_Basel_Hong_Kong_2021_Partners-3-1.jpg",
    alt: "abstract artwork in bright reds and oranges, resembling lava flow or oils",
  });

  // word & allWordsList both need to access this state:
  const [wordToSubmit, setWordToSubmit] = useState("");

  return (
    <div className="container">
      <Header />
      <Timer />
      <Image currentImageObj={currentImageObj} />
      <Instructions />
      <Word
        currentImageObj={currentImageObj}
        wordToSubmit={wordToSubmit}
        setWordToSubmit={setWordToSubmit}
        userIP={userIP}
      />
      <AllWordsList
        currentImageObj={currentImageObj}
        wordToSubmit={wordToSubmit}
      />
      <Results />
      <Footer />
    </div>
  );
}

export default App;
