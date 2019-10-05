import React, { useState } from "react";
import { Select } from "react-materialize";

function Survey() {
  const [answers, updateAnswers]: [
    { [k: string]: number },
    Function
  ] = useState({
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    seven: 0,
    eight: 0,
    nine: 0,
    ten: 0
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = "/api";
    const data = { answers: getAnswers() };
    console.log(data);
    try {
      const response = await fetch(url, {
        method: "POST", // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
          "Content-Type": "application/json"
        }
      });
      const json = await response.json();
      console.log("Success:", JSON.stringify(json));
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleChange = (e: { target: { id: string; value: number } }) => {
    const temp: { [k: string]: number } = answers;
    const id = e.target.id;
    temp[id] = e.target.value;
    updateAnswers(temp);
  };

  const getAnswers = () => {
    const arr: number[] = [];
    Object.keys(answers).forEach(prop => arr.push(answers[prop]));
    return arr;
  };

  return (
    <div className="container survey">
      <h1>Survey:</h1>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="input-field col s12">
            <Select id="one" value="" onChange={handleChange}>
              <option value="" disabled>
                Choose your option
              </option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Select>
            <label>Question One</label>
          </div>
          <input
            id="survey-submit"
            type="submit"
            className="btn right"
            value="Submit Answers"
          />
        </form>
      </div>
    </div>
  );
}

export default Survey;
