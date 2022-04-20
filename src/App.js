import "./App.css";
import react, { useState, useEffect } from "react";
import Header from "./components/Header";
import Username from "./components/Username";
import AllWordsList from "./components/AllWordsList";
import Image from "./components/Image";
import Instructions from "./components/Instructions";
import Timer from "./components/Timer";
import Word from "./components/Word";
import Results from "./components/Results";
import Footer from "./components/Footer";
import { v4 as uuid } from "uuid";

const phaseDuration = 20 * 1000;
const phaseCount = 3;

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

    fetch(`http://localhost:9292/images/current`)
      .then((res) => res.json())
      .then((returnImgObj) => {
        // console.group("Img Fetch");
        // console.log(returnImgObj);

        if (isInPlay(returnImgObj)) {
          // console.log("is in play");
          setCurrentImageObj(returnImgObj);
          setPhaseByImg(returnImgObj);
        } else {
          // console.log("is NOT in play");
          setupNextImage().then((newImg) => {
            setCurrentImageObj(newImg);
            setPhaseByImg(newImg);
          });
        }
        // console.groupEnd();
      })
      .catch((error) => console.log(error.message));
  }, []);

  function isInPlay(imgObj) {
    // console.log("Date.now: ", Date.now());
    // console.log("ImgStart: ", imgObj.start_time);
    // console.log("Now - Start", (Date.now() - imgObj.start_time) / 1000);
    // console.log("Endtime: ", phaseCount * phaseDuration + imgObj.start_time);
    // console.log(
    //   "End - Now: ",
    //   (phaseCount * phaseDuration + imgObj.start_time - Date.now()) / 1000
    // );

    return (
      imgObj != {} &&
      Date.now() < phaseCount * phaseDuration + imgObj.start_time
    );
  }

  function setPhaseByImg(imgObj) {
    const elapsedTime = Date.now() - imgObj.start_time;
    const phaseInt = Math.floor(elapsedTime / phaseDuration);

    switch (phaseInt) {
      case 0:
        setPhase("submit");
        break;
      case 1:
        setPhase("vote");
        break;
      case 2:
        setPhase("results");
        break;

      default:
        alert("could not set phase for image...");
        break;
    }
  }

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
        setupNextImage().then((newImg) => startNewRound(newImg));
        break;
      default:
        console.error("invalid phase name, fix that shit");
        break;
    }
  }

  function setupNextImage() {
    // get new image from api
    const img_seed = uuid();
    const img_url = `https://picsum.photos/seed/${img_seed}/700/500`;

    return fetch(`http://localhost:9292/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        url: img_url,
        alt: "randomly generated image",
        start_time: Math.floor(Date.now() / 1000) * 1000, // time in milliseconds, rounded to previous second mark
      }),
    })
      .then((res) => res.json())
      .then((returnedImgObj) => returnedImgObj)
      .catch((error) => console.log(error.message));
    // add to table
    console.log("added new image to table here");
  }

  function startNewRound(newImg) {
    setCurrentImageObj(newImg);
  }

  return (
    <div className="pageContainer">
      <div className="contentWrap">
        <Header />
        <Username
          currentUserObj={currentUserObj}
          setCurrentUserObj={setCurrentUserObj}
        />
        <button onClick={progressPhase} className="temp-grid-item">
          Current Phase: <b>{phase}</b>; <em>Click to progress</em>
        </button>
        {!!currentImageObj.start_time && (
          <Timer
            progressPhase={progressPhase}
            setPhase={setPhase}
            currentImageObj={currentImageObj}
            phaseDuration={phaseDuration}
          />
        )}
        <Image currentImageObj={currentImageObj} />
        <Instructions phase={phase} />
        {phase === "submit" && (
          <Word
            currentImageObj={currentImageObj}
            wordToSubmit={wordToSubmit}
            setWordToSubmit={setWordToSubmit}
          />
        )}
        <div className="phaseBtnContainer">
          <button onClick={progressPhase} className="temp-grid-item">
            click to progress phase
          </button>
        </div>

        <Timer progressPhase={progressPhase} phase={phase} />
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
      </div>
      <Footer />
    </div>
  );
}

export default App;
