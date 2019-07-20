import React from "react";
import Result from "./Result";

interface Props {
  answers: Array<{
    givenAnswer: {
      name: string;
      correct: boolean;
    };
    correctAnswer: {
      name: string;
      correct: true;
    };
  }>;
}

const getIntro = (correctAnswerCount, answers) => {
  const percentCorrect = correctAnswerCount / answers.length;

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

const Results: React.FC<Props> = ({ answers }) => {
  const correctAnswerCount = answers.filter(answer => {
    return answer.givenAnswer.correct === true;
  }).length;

  return (
    <div>
      <h2>{getIntro(correctAnswerCount, answers)}</h2>
      <p>{`You got ${correctAnswerCount} out of ${answers.length}.`}</p>
      <ol>
        {answers.map(answer => {
          return <Result {...answer} />;
        })}
      </ol>
    </div>
  );
};

export default Results;
