import React, { useState } from "react";
import { FullCountries, QuizSetup } from "../types";
import { questionTypes } from "../Helpers/questionTypes";

interface Props extends FullCountries {
  quizSetup: QuizSetup;
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

const Questions: React.FC<Props> = ({ countries, quizSetup }) => {
  console.log(quizSetup);

  const questions = quizSetup.selectedCountries.map(selectedCountry => {
    const country = countries.find(country => country.code === selectedCountry);
    const questionCode =
      quizSetup.selectedQuestions[
        Math.floor(Math.random() * quizSetup.selectedQuestions.length)
      ];
    return getQuestion(questionCode, country);
  });

  return (
    <div>
      <ul>
        {questions.map(question => (
          <li>{question}</li>
        ))}
      </ul>
      <p>{JSON.stringify(countries)}</p>
      <p>{JSON.stringify(quizSetup)}</p>
    </div>
  );
};

export default Questions;
