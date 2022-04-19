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
  // the current user IP TODO: derive from session or internal storage
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

  // the user's current guess
  const [currentGuessObj, setCurrentGuessObj] = useState({});

  function progressPhase() {
    switch (phase) {
      case "submit":
        setPhase("vote");
        break;
      case "vote":
        setPhase("results");
        break;
      case "results":
        setPhase("submit");
        break;
      default:
        console.error("invalid phase name, fix that shit");
        break;
    }
  }

  return (
    <div className="container">
      <button onClick={progressPhase}>
        Cur Phase: {phase}; Click to progress
      </button>
      <Header />
      <Timer />
      <Image currentImageObj={currentImageObj} />
      <Instructions phase={phase} />
      {phase === "submit" && (
        <Word
          currentImageObj={currentImageObj}
          wordToSubmit={wordToSubmit}
          setWordToSubmit={setWordToSubmit}
          userIP={userIP}
        />
      )}
      {phase === "vote" && (
        <AllWordsList
          currentImageObj={currentImageObj}
          wordToSubmit={wordToSubmit}
          currentGuessObj={currentGuessObj}
          setCurrentGuessObj={setCurrentGuessObj}
          userIP={userIP}
        />
      )}
      {phase === "results" && <Results />}
      <Footer />
    </div>
  );
}

export default App;
