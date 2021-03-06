import React from "react";
import Result from "./Result";
import { Answer } from "../types";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

interface Props {
  answers: Array<Answer>;
  reset: Function;
}

const listCss = css`
  padding: 10px 0 40px 0;
  margin: 0;
  list-style-type: none;
`;

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

const Results: React.FC<Props> = ({ answers, reset }) => {
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
      <ol css={listCss}>
        {answers.map(answer => {
          return <Result {...answer} />;
        })}
      </ol>
      <button
        type="button"
        onClick={e => {
          e.preventDefault();
          reset();
        }}
      >
        Start a new quiz
      </button>
    </div>
  );
};

export default Results;
