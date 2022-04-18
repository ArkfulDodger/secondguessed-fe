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
  return (
    <div className="container">
      <Header />
      <Timer />
      <Image />
      <Instructions />
      <Word />
      <AllWordsList />
      <Results />
      <Footer />
    </div>
  );
}

export default App;
