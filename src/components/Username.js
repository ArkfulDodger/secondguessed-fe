import React, { useState } from "react";

function Username({ currentUserObj, setCurrentUserObj, URL }) {
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameSubmitted, setUsernameSubmitted] = useState(
    currentUserObj.name !== "Guest"
  );

  function handleSubmit(e) {
    e.preventDefault();

    // validate that input is not empty
    if (usernameInput === "") {
      alert("please enter a username");
    } else {
      console.log("user name: ", usernameInput);
    }

    // PATCH: add username to user in database
    fetch(`${URL}/users/${currentUserObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: usernameInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("PATCH data: ", data);
        setCurrentUserObj(data);
      })
      .catch((error) => console.log(error.message));

    // reset the form
    setUsernameInput("");
    setUsernameSubmitted(true);
  }

  const inputClassName =
    usernameSubmitted === false ? "userInput" : "userInput hidden";

  function handleUpdateUserClick() {
    setUsernameInput(currentUserObj.name);
    setUsernameSubmitted(false);
  }

  return (
    <div className="usernameContainer grid-item11">
      <span className="currentUser">
        <b>{currentUserObj.name}</b>
      </span>

      {usernameSubmitted === false ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className={inputClassName}
            name="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="enter name here"
          ></input>
          <input
            type="submit"
            value="submit"
            className="btn submitUsernameBtn"
          />
        </form>
      ) : (
        <button
          className="btn updateUsernameBtn"
          onClick={handleUpdateUserClick}
        >
          update username
        </button>
      )}
    </div>
  );
}

export default Username;
