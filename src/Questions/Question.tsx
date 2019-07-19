import React from "react";

interface Props {
  question: string;
  options: Array<{
    name: string;
  }>;
}

const Questions: React.FC<Props> = ({ question, options }) => {
  return (
    <div>
      <h3>{question}</h3>
      {options.map(option => {
        return (
          <label>
            <input type="radio" name="option" value={option.name} />
            {option.name}
          </label>
        );
      })}
    </div>
  );
};

export default Questions;
