import React, { useState } from "react";
import { TextInput } from "react-materialize";
import Question from "./Question";

const Survey: React.FC = () => {
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
  const questions: string[] = [
    "You prefer to stay at home rather than go out and party.",
    "You prefer cats over dogs"
  ];
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
      <h2>About You</h2>
      <TextInput placeholder="Name (Required)" />
      <TextInput placeholder="Link to Picture of You (Required)" />
      <h2>Survey:</h2>
      <p>
        Rate how much you agree with the following statements, from a 1
        (strongly disagree) to a 5 (strongly agree)
      </p>
      <div className="row">
        <form onSubmit={handleSubmit}>
          {questions.map((question, idx) => {
            return (
              <Question
                key={idx}
                text={questions[idx]}
                callback={handleChange}
              />
            );
          })}
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
};

export default Survey;
