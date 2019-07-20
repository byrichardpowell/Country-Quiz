import React from "react";
import { Answer } from "../types";

const getAnswerIntro = (correctAnswer, givenAnswer) => {
  return correctAnswer.name === givenAnswer.name ? "Correct" : "Sorry";
};

const getAnswerText = (questionCode, country, correctAnswer) => {
  switch (questionCode) {
    case "phone":
      return `${correctAnswer.name} is the international dialing code for ${
        country.name
      }`;
    case "continent":
      return `${country.name} belongs to the continent of ${
        correctAnswer.name
      }`;
    case "languages":
      return `${country.name} speaks ${country.languages[0].name}`;
    case "currency":
      return `${correctAnswer.name} is the currency of ${country.name}`;
    case "emoji":
      return `${country.emoji} is the flag for ${country.name}`;
  }
};

const getAnswerOutro = (correctAnswer, givenAnswer) => {
  if (correctAnswer.name !== givenAnswer.name) {
    return `not ${givenAnswer.name}`;
  }
};

const Result: React.FC<Answer> = ({
  questionCode,
  country,
  givenAnswer,
  correctAnswer
}) => {
  return (
    <li>
      {getAnswerIntro(correctAnswer, givenAnswer)}{" "}
      {getAnswerText(questionCode, country, correctAnswer)}{" "}
      {getAnswerOutro(correctAnswer, givenAnswer)}
    </li>
  );
};

export default Result;
