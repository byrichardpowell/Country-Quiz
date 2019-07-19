import React, { useState } from "react";

interface Props {
  question: string;
  options: Array<{
    name: string;
    correct: boolean;
  }>;
  didSubmit: Function;
}

const Questions: React.FC<Props> = ({ question, options, didSubmit }) => {
  const [answer, setAnswer] = useState(null);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        didSubmit({
          givenAnswer: options.find(option => option.name === answer),
          correctAnswer: options.find(option => option.correct === true)
        });
        setAnswer(null);
      }}
    >
      <fieldset>
        <legend>{question}</legend>
        {options.map(option => {
          return (
            <label>
              <input
                type="radio"
                name="option"
                value={option.name}
                onChange={e => setAnswer(option)}
                checked={answer && answer.name === option.name}
              />
              {option.name}
            </label>
          );
        })}
      </fieldset>
      <button type="submit" disabled={!answer}>
        Next
      </button>
    </form>
  );
};

export default Questions;
