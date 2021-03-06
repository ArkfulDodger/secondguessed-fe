import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

function SharableUserSolution() {
  const [currentUserObj, setCurrentUserObj] = useState({});

  // on component/page load, get/create user
  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      console.log("Existing ID found in local storage...");
      getCurrentUser();
    } else {
      console.log("No Existing ID in local storage; Creating New...");
      createNewUser();
    }
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

  return <>something</>;
}

export default SharableUserSolution;
