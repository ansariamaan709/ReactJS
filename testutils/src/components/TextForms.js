import React, { useState } from "react";
import PropTypes from "prop-types";

export default function TextForms(props) {
  const [text, setText] = useState("This is Text Area");
  const convertUp = (event) => {
    var prevText = text;
    var upperText = text.toUpperCase();
    if (prevText === upperText) {
      alert("Text is already UpperCase");
    } else {
      setText(upperText);
    }
  };
  const changeText = (event) => {
    var newText = event.target.value;
    setText(newText);
  };
  return (
    <>
      <h1
        className={`form-group text-${
          props.mode === "dark" ? "light" : "dark"
        }`}
      >
        {props.heading}
      </h1>
      <div
        className={`form-group text-${
          props.mode === "dark" ? "light" : "dark"
        }`}
      >
        <label for="exampleFormControlTextarea1 ">Example textarea</label>
        <textarea
          className={`form-control text-${props.mode === "dark"}`}
          value={text}
          onChange={changeText}
          style={{ backgroundColor: props.mode === "dark" ? "grey" : "white" }}
          id="exampleFormControlTextarea1"
          rows="6"
        ></textarea>
        <div></div>
        <div>
          <button
            type="submit"
            className={`btn btn-outline-info my-3 text-${
              props.mode === "dark" ? "light" : "dark"
            }`}
            onClick={convertUp}
          >
            Convert To Uppercase
          </button>
        </div>
        <label for="exampleFormControlTextarea1 ">Text Summary</label>
        <p>The are {text.split(" ").length} characters</p>
      </div>
    </>
  );
}
