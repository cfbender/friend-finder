import React, { useState } from "react";
import { TextInput, Modal } from "react-materialize";
import Question from "./Question";
import "./Survey.css";

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

  const [name, updateName]: [
    { text?: string; error?: string },
    Function
  ] = useState({});
  const [picture, updatePicture]: [
    { text?: string; error?: string },
    Function
  ] = useState({});

  const questions: string[] = [
    "You prefer to stay at home rather than go out and party.",
    "You prefer cats over dogs",
    "You love the great outdoors",
    "You'll never spend more than $2.99 on a draft beer",
    "When you lift your arms up, it looks like you've been swimming in shoulder-height water",
    "You'll wear yesterday's underwear",
    "You can't function without at least 3 cups of coffee",
    "You are totally fine to poop in public",
    "You think double-dipping is A-okay",
    "Your name is Ben Shapiro"
  ];
  interface FriendMatch {
    show: boolean;
    data?: { name: string; photo: string };
  }

  const [match, updateMatch]: [FriendMatch, Function] = useState({
    show: false
  });

  const [errors, updateErrors]: [{ [k: string]: string }, Function] = useState(
    {}
  );

  const formValidate = (): boolean => {
    updateErrors({});
    let formIsValid = true;
    let temp: { [k: string]: string } = {};
    Object.keys(answers).forEach(prop => {
      if (answers[prop] === 0) {
        formIsValid = false;
        temp[prop] = "You must select an answer";
        updateErrors(temp);
      }
    });
    if (!name.text) {
      formIsValid = false;
      updateName({ error: "You must enter a name." });
    }
    if (!picture.text) {
      formIsValid = false;
      updatePicture({ error: "You must enter a photo link." });
    }
    return formIsValid;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formValidate()) {
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
        json.show = true;
        updateMatch(json);
      } catch (error) {
        console.log("Error", error);
      }
    }
  };

  const handleChange = (e: { target: { id: number; value: number } }) => {
    console.log(name);
    formValidate();
    console.log(name);
    const temp = answers;
    const id = e.target.id;
    temp[id] = e.target.value;
    const tempErrors = errors;
    tempErrors[id] = "";
    updateAnswers(temp);
    updateErrors(tempErrors);
  };

  const getAnswers = () => {
    const arr: number[] = [];
    Object.keys(answers).forEach(prop => arr.push(answers[prop]));
    return arr;
  };

  return (
    <div className="container survey">
      <h2>About You</h2>
      <Modal header="Modal Header" open={match.show}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum
        </p>
      </Modal>
      <TextInput
        placeholder="Name (Required)"
        onChange={(e: { target: { value: string } }) =>
          updateName({ text: e.target.value })
        }
      />
      <p className="text-error">{name.error}</p>
      <TextInput
        placeholder="Link to Picture of You (Required)"
        onChange={(e: { target: { value: string } }) =>
          updatePicture({ text: e.target.value })
        }
      />
      <p className="text-error">{picture.error}</p>
      <h2>Survey:</h2>
      <p>
        Rate how much you agree with the following statements, from a 1
        (strongly disagree) to a 5 (strongly agree)
      </p>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <label>
            {questions.map((question, idx) => {
              let prop = Object.keys(answers)[idx];
              return (
                <div className="question row" key={`div${idx + 1}`}>
                  <Question
                    key={idx + 1}
                    name={prop}
                    text={questions[idx]}
                    callback={handleChange}
                    errors={errors[prop]}
                    selected={answers[prop]}
                  />
                </div>
              );
            })}
          </label>
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
