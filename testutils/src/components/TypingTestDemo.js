import React, { useState, useEffect, useRef } from 'react';

const TypingTestDemo = () => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    fetchRandomText();
  }, []);

  useEffect(() => {
    if (!started) {
      inputRef.current.focus();
    }
  }, [started]);

  useEffect(() => {
    if (input === text) {
      setFinished(true);
      setStarted(false);
    }
  }, [input, text]);

  const fetchRandomText = async () => {
    const response = await fetch('https://api.quotable.io/random?minLength=50');
    const data = await response.json();
    setText(data.content);
  };

  const handleInputChange = (e) => {
    if (!started) {
      setStarted(true);
      startTimer();
    }
    setInput(e.target.value);
  };

  const startTimer = () => {
    const startTime = Date.now();
    const timerInterval = setInterval(() => {
      setTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timerInterval);
  };

  const restartTest = () => {
    fetchRandomText();
    setInput('');
    setTime(0);
    setStarted(false);
    setFinished(false);
    inputRef.current.focus();
  };

  return (
    <div>
      <h2>Type the following:</h2>
      <p>{text}</p>
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleInputChange}
        disabled={finished}
        placeholder="Start typing here..."
      ></textarea>
      {started && <p>Time: {time} seconds</p>}
      {finished && (
        <div>
          <p>Finished in {time} seconds</p>
          <button onClick={restartTest}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default TypingTestDemo;
