import React from "react";

interface Props {
  givenAnswer: {
    name: string;
    correct: boolean;
  };
  correctAnswer: {
    name: string;
    correct: true;
  };
}

const Result: React.FC<Props> = ({ givenAnswer, correctAnswer }) => {
  console.log(givenAnswer, correctAnswer);

  return (
    <li>
      {givenAnswer.correct ? givenAnswer.name : "oh no" + correctAnswer.name}
    </li>
  );
};

export default Result;
