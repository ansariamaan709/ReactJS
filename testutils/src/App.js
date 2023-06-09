import "./App.css";
//import About from './components/About';
import Navbar from "./components/Navbar";
import TextForms from "./components/TextForms";
import React, { useState } from "react";
import TypingTest from "./components/TypingTest";
import Contact from "./components/Contact";
import TypingTestDemo from "./components/TypingTestDemo";

function App() {
  const [mode, setMode] = useState("light");
  const [btnName, setBtnName] = useState("Enable Dark Mode");
  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
      setBtnName("Enable Dark Mode");
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "#01183a";
      setBtnName("Disable Dark Mode");
    }
  };

  return (
    <>
      <Navbar mode={mode} toggleMode={toggleMode} btnName={btnName}></Navbar>
      <div className="container">
        <TextForms
          heading="TextUtils"
          mode={mode}
          toggleMode={toggleMode}
        ></TextForms>
      </div>
      {/*<About></About>  */}
      <TypingTest mode={mode} toggleMode={toggleMode}></TypingTest>
    </>
  );
}

export default App;
