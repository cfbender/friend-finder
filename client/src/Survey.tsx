import React, { useState } from "react";
import { TextInput, Modal, Button } from "react-materialize";
import Question from "./Question";
import "./Survey.css";
import { navigate } from "@reach/router";

const Survey: React.FC = () => {
  //hook to store answers
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

  //hooks to store name and picture from text boxes
  const [name, updateName]: [
    { text?: string; error?: string },
    Function
  ] = useState({});
  const [picture, updatePicture]: [
    { text?: string; error?: string },
    Function
  ] = useState({});

  //array storing questions
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
    data: { name: string; photo: string };
  }

  // hook to store the match back from the response
  const [match, updateMatch]: [FriendMatch, Function] = useState({
    show: false,
    data: {
      photo: "http://placecorgi.com/250",
      name: "Rufus"
    }
  });
  //hook to store any error text for the survey
  const [errors, updateErrors]: [{ [k: string]: string }, Function] = useState(
    {}
  );

  /**
   * @description Checks if text is in the text boxes, and if all questions have been answered, and updates state accordingly
   *
   * @returns {boolean} if form is valid
   */
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

  /**
   * @description Validates form, collects data, sends POST to API and receives response
   *
   * @param {*} e event for form submit
   */
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (formValidate()) {
      const url = "/api";
      const data = {
        photo: picture.text,
        name: name.text,
        answers: getAnswers()
      };
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

  /**
   * @description Stores all new answers and errors
   *
   * @param {{ target: { id: number; value: number } }} e a state change event for the form
   */
  const handleChange = (e: { target: { id: number; value: number } }) => {
    formValidate();
    const temp = answers;
    const id = e.target.id;
    temp[id] = e.target.value;
    const tempErrors = errors;
    tempErrors[id] = "";
    updateAnswers(temp);
    updateErrors(tempErrors);
  };

  /**
   * @description Takes all numbers from answers and gathers into array
   *
   * @returns {number[]} An array of all user-selected numbers
   */
  const getAnswers = () => {
    const arr: number[] = [];
    Object.keys(answers).forEach(prop => arr.push(answers[prop]));
    return arr;
  };

  return (
    <div className="container survey bounce-in-top">
      <h2>About You</h2>
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
              {
                /* Renders out all questions as a Question component*/
              }
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
      {/* Modal only active after response is successful, close button navigates to root*/}
      <Modal
        header="Your friend match is here!"
        open={match.show}
        actions={
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Close
          </Button>
        }
      >
        <div className="modal-container">
          <img
            src={match.data.photo}
            alt="friend photo"
            className="modal-photo"
          />
          <h2 className="modal-name">{match.data.name}</h2>
          <p className="modal-text">
            We hope you have a long, successful friendship!
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Survey;
