import React, { useState, useEffect } from "react";

const TypingTest = (props) => {
  const [testText, setTestText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [endTime1, setEndTime1] = useState(false);

  useEffect(() => {
    // Fetch or generate the test text
    // For simplicity, we will generate a random text
    const fetchRandomText = async () => {
      const response = await fetch(
        "https://api.quotable.io/random?minLength=200"
      );
      const data = await response.json();
      setTestText(data.content);
    };

    fetchRandomText();
  }, []);

  const handleChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    // Compare user input with test text
    const correctChars = input
      .split("")
      .filter((char, index) => char === testText[index]);

    setCorrectCount(correctChars.length);
  };

  const handleStart = () => {
    setStartTime(Date.now());
    const endTime1 = true;
    setEndTime1(endTime1);
    setEndTime(null);
    const i = 0;
    setCorrectCount(i);
    const input = "";
    setUserInput(input);
  };

  const handleFinish = () => {
    setEndTime(Date.now());
    setEndTime1(false);
  };

  const handleReset = () => {
    const input = "";
    setUserInput(input);
    const startTime = null;
    const endTime = null;
    setStartTime(startTime);
    setEndTime(endTime);
    setCorrectCount(0);
    setEndTime1(false);
  };

  const calculateSpeed = () => {
    if (startTime && endTime) {
      const elapsedTime = (endTime - startTime) / 1000; // in seconds
      const wordsPerMinute = correctCount / 5 / (elapsedTime / 60);
      return Math.round(wordsPerMinute);
    }
    return 0;
  };

  const calculateAccuracy = () => {
    if (testText.length > 0) {
      const accuracy = (correctCount / testText.length) * 100;
      return Math.round(accuracy);
    }
    return 0;
  };

  return (
    <div>
      <div
        className={`form-group text-${
          props.mode === "dark" ? "light" : "dark"
        }`}
      >
        {testText}
      </div>
      <input
        className={`form-control text-${props.mode === "dark"}`}
        style={{ backgroundColor: props.mode === "dark" ? "grey" : "white" }}
        type="text"
        value={userInput}
        onChange={handleChange}
        onFocus={handleStart}
        //disabled={endTime !== null}
      />
      <button
        className={`btn btn-outline-info my-3 text-${
          props.mode === "dark" ? "light" : "dark"
        }`}
        onClick={handleStart}
        disabled={startTime !== null}
      >
        Start
      </button>
      <button
        className={`btn btn-outline-info my-3 mx-3 text-${
          props.mode === "dark" ? "light" : "dark"
        }`}
        onClick={handleFinish}
        disabled={endTime1 === false}
      >
        Finish
      </button>
      <button
        className={`btn btn-outline-info my-3 text-${
          props.mode === "dark" ? "light" : "dark"
        }`}
        onClick={handleReset}
      >
        Reset
      </button>
      {endTime && (
        <div>
          <p
            className={`form-group text-${
              props.mode === "dark" ? "light" : "dark"
            }`}
          >
            Typing Speed: {calculateSpeed()} WPM
          </p>
          <p
            className={`form-group text-${
              props.mode === "dark" ? "light" : "dark"
            }`}
          >
            {" "}
            Accuracy: {calculateAccuracy()}%
          </p>
        </div>
      )}
    </div>
  );
};

export default TypingTest;
