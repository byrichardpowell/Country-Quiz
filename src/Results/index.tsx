import React from "react";
import Result from "./Result";
import { Answer } from "../types";

interface Props {
  answers: Array<Answer>;
}

const getIntro = (percentCorrect: number): string => {
  if (percentCorrect === 1) {
    return "Amazing! Congratulations! Perfecto!";
  } else if (percentCorrect > 0.5) {
    return "Good job";
  } else if (percentCorrect > 0.3) {
    return "Not bad";
  } else {
    return "Oh no!";
  }
};

const getScoreOutro = (percentCorrect: number): string => {
  if (percentCorrect === 1) {
    return "Amazing job.  You're a real expert";
  } else if (percentCorrect > 0.5) {
    return "That's pretty good.";
  } else if (percentCorrect > 0.3) {
    return "Not bad.  Could be better.";
  } else {
    return "Better luck next time.";
  }
};

const Results: React.FC<Props> = ({ answers }) => {
  const correctAnswerCount = answers.filter(answer => {
    return answer.givenAnswer.correct === true;
  }).length;
  const percentCorrect = correctAnswerCount / answers.length;

  return (
    <div>
      <h2>{getIntro(percentCorrect)}</h2>
      <p>{`${correctAnswerCount} out of ${answers.length}. ${getScoreOutro(
        percentCorrect
      )}`}</p>
      <ol>
        {answers.map(answer => {
          return <Result {...answer} />;
        })}
      </ol>
    </div>
  );
};

export default Results;
