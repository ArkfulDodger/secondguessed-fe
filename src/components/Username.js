import React, { useState } from "react";

function Username({ currentUserObj, setCurrentUserObj }) {
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
    fetch(`http://localhost:9292/users/${currentUserObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ name: usernameInput }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("PATCH data: ", data);
        setCurrentUserObj(data);
      })
      .catch((error) => console.log(error.message));

    // reset the form
    setUsernameInput("");
    setUsernameSubmitted(true);
  }

  const inputClassName = usernameSubmitted === false ? "" : "hidden";

  return (
    <div className="usernameContainer grid-item11">
      <span>Current User: {currentUserObj.name}</span>

      {usernameSubmitted === false ? (
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className={inputClassName}
            name="username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="enter name here"
          ></input>
        </form>
      ) : (
        <button onClick={() => setUsernameSubmitted(false)}>
          update username
        </button>
      )}
    </div>
  );
}

export default Username;