import React from "react";
import { Select } from "react-materialize";

const Question: React.FC<{ text: string; callback: Function }> = ({
  text,
  callback
}) => {
  return (
    <div>
      <div className="input-field col s12">
        <Select id="one" value="" onChange={callback}>
          <option value="" disabled>
            Choose your option
          </option>
          <option value="1">1 (strongly disagree)</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5 (strongly agree)</option>
        </Select>
        <label>{text}</label>
      </div>
    </div>
  );
};

export default Question;
