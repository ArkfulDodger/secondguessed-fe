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
  const [sessionId, setsessionId] = useState("000.000.0.0");

  const [phase, setPhase] = useState("submit");
  // phases: submit, vote, results
  // conditional checks which phase & displays correct component
  // first: manually write code to change phases
  // next: set up to change on timer

  const [currentImageObj, setCurrentImageObj] = useState({});

  // word & allWordsList both need to access this state:
  const [wordToSubmit, setWordToSubmit] = useState("");

  // the user's current guess
  const [currentGuessObj, setCurrentGuessObj] = useState({});

  // get desired first image on app load
  useEffect(() => {
    fetch(`http://localhost:9292/current-user`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error.message));

    fetch(`http://localhost:9292/images/first`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCurrentImageObj(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

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
        setupNextImage();
        startNewRound();
        break;
      default:
        console.error("invalid phase name, fix that shit");
        break;
    }
  }

  function setupNextImage() {
    // get new image from api
    // add to table
    console.log("added new image to table here");
  }

  function startNewRound() {
    fetch(`http://localhost:9292/images/next/${currentImageObj.id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCurrentImageObj(data);
      })
      .catch((error) => console.log(error.message));
  }

  function postSession() {
    fetch(`http://localhost:9292/`)
      .then((res) => {
        console.log("RES:", res);
        return res.json();
      })
      .then((data) => console.log("DATA:", data))
      .catch((error) => console.log(error.message));
  }

  function getSession() {
    fetch(`http://localhost:9292/session_value`)
      .then((res) => {
        console.log("RES:", res);
        return res.json();
      })
      .then((data) => console.log("DATA:", data))
      .catch((error) => console.log(error.message));
  }

  return (
    <div className="container">
      <button onClick={progressPhase}>
        Cur Phase: {phase}; Click to progress
      </button>
      <button onClick={postSession}>Post Session Data</button>
      <button onClick={getSession}>Get Session Data</button>
      <Header />
      <Timer />
      <Image currentImageObj={currentImageObj} />
      <Instructions phase={phase} />
      {phase === "submit" && (
        <Word
          currentImageObj={currentImageObj}
          wordToSubmit={wordToSubmit}
          setWordToSubmit={setWordToSubmit}
          sessionId={sessionId}
        />
      )}
      {phase === "vote" && (
        <AllWordsList
          currentImageObj={currentImageObj}
          wordToSubmit={wordToSubmit}
          currentGuessObj={currentGuessObj}
          setCurrentGuessObj={setCurrentGuessObj}
          sessionId={sessionId}
        />
      )}
      {phase === "results" && (
        <Results
          sessionId={sessionId}
          currentImageObj={currentImageObj}
          currentGuessObj={currentGuessObj}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
