import React, { useState } from "react";
import { FullCountry } from "../types";

interface Props {
  country: FullCountry;
  questionCode: string;
  options: Array<{
    name: string;
    correct: boolean;
  }>;
  didSubmit: Function;
}

const getQuestion = (questionCode, country) => {
  switch (questionCode) {
    case "phone":
      return `What phone code does ${country.name} have?`;
    case "continent":
      return `What continent does ${country.name} belong to?`;
    case "currency":
      return `What currency does ${country.name} use?`;
    case "languages":
      return `What is one language ${country.name} speaks?`;
    case "emoji":
      return `What is the flag of ${country.name}?`;
  }
};

const Questions: React.FC<Props> = ({
  questionCode,
  country,
  options,
  didSubmit
}) => {
  const [answer, setAnswer] = useState(null);
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        didSubmit({
          questionCode,
          country,
          givenAnswer: options.find(option => option.name === answer.name),
          correctAnswer: options.find(option => option.correct === true)
        });
        setAnswer(null);
      }}
    >
      <fieldset>
        <legend>{getQuestion(questionCode, country)}</legend>
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
