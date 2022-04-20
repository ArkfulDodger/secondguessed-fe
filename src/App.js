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
import Countdown from "./components/Countdown";
import { v4 as uuid } from "uuid";

function App() {
  const [phase, setPhase] = useState("submit");
  // phases: submit, vote, results
  // conditional checks which phase & displays correct component
  // first: manually write code to change phases
  // next: set up to change on timer

  const [currentImageObj, setCurrentImageObj] = useState({});

  const [currentUserObj, setCurrentUserObj] = useState({});

  // word & allWordsList both need to access this state:
  const [wordToSubmit, setWordToSubmit] = useState("");

  // the user's current guess
  const [currentGuessObj, setCurrentGuessObj] = useState({});

  // get desired first image on app load
  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      console.log("Existing ID found in local storage...");
      getCurrentUser();
    } else {
      console.log("No Existing ID in local storage; Creating New...");
      createNewUser();
    }

    fetch(`http://localhost:9292/images/first`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setCurrentImageObj(data);
      })
      .catch((error) => console.log(error.message));
  }, []);

  // retrieve user from db based on ID in local storage
  function getCurrentUser() {
    // get existing ID from local storage
    const existingSessionId = JSON.parse(localStorage.getItem("sessionId"));

    // fetch user data from your database
    fetch(`http://localhost:9292/users/${existingSessionId}`)
      .then((res) => res.json())
      .then((returnedUserData) => {
        // if the user is found in the db, set user state to returned user
        if (returnedUserData) {
          console.log("User found in db!");
          setCurrentUserObj(returnedUserData);

          // if user not found in db, create new user
        } else {
          console.log("User not found in db; Creating New...");
          createNewUser();
        }
      })
      .catch((error) => console.log(error.message));
  }

  function createNewUser() {
    // create new unique id
    const sessionId = uuid();

    // store id to local storage
    localStorage.setItem("sessionId", JSON.stringify(sessionId));

    // post new user
    fetch(`http://localhost:9292/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: "Guest",
        session_id: sessionId,
      }),
    })
      .then((res) => res.json())
      .then((returnedUserData) => {
        console.log("New user created");
        setCurrentUserObj(returnedUserData);
      })
      .catch((error) => console.log(error.message));
  }

  function progressPhase() {
    switch (phase) {
      case "submit":
        setPhase("vote");
        console.log("changed phase to vote");
        break;
      case "vote":
        setPhase("results");
        console.log("changed phase to results");
        break;
      case "results":
        setPhase("submit");
        console.log("changed phase to submit");
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

  return (
    <div className="container">
      <Header />

      <button onClick={progressPhase} className="temp-grid-item">
        Current Phase: <b>{phase}</b>; <em>Click to progress</em>
      </button>

      <Timer phase={phase} setPhase={setPhase} progressPhase={progressPhase} />
      <Image currentImageObj={currentImageObj} />
      <Instructions phase={phase} />
      {phase === "submit" && (
        <Word
          currentImageObj={currentImageObj}
          wordToSubmit={wordToSubmit}
          setWordToSubmit={setWordToSubmit}
          currentUserObj={currentUserObj}
        />
      )}
      {phase === "vote" && (
        <AllWordsList
          currentImageObj={currentImageObj}
          wordToSubmit={wordToSubmit}
          currentGuessObj={currentGuessObj}
          setCurrentGuessObj={setCurrentGuessObj}
          currentUserObj={currentUserObj}
        />
      )}
      {phase === "results" && (
        <Results
          currentUserObj={currentUserObj}
          currentImageObj={currentImageObj}
          currentGuessObj={currentGuessObj}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
