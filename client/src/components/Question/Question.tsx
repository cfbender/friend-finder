import React from "react";
import { Select } from "react-materialize";

export const Question: React.FC<{
  name: string;
  text: string;
  callback: Function;
  errors: string;
  selected: number;
}> = ({ name, text, callback, errors, selected }) => {
  return (
    <div className="col s12">
      <Select
        id={name}
        label={text}
        value={selected.toString() || ""}
        onChange={callback}
      >
        <option value="0" disabled>
          Choose your option
        </option>
        <option value="1">1 (strongly disagree)</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5 (strongly agree)</option>
      </Select>
      <span className="question-error">{errors}</span>
    </div>
  );
};
