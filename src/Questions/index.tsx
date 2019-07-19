import React, { useState } from "react";
import Question from "./Question";

interface Props {
  questions: Array<{
    question: string;
    options: Array<{
      name: string;
      correct: boolean;
    }>;
  }>;
  didFinish: Function;
}

const Questions: React.FC<Props> = ({ questions, didFinish }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const question = questions[questionIndex];
  return (
    <div>
      <h2>
        Question {questionIndex + 1} of {questions.length}
      </h2>
      <Question
        {...question}
        didSubmit={answer => {
          const newQuestionIndex = questionIndex + 1;
          const newAnswers = [...answers, ...[answer]];

          if (newQuestionIndex === questions.length) {
            didFinish(newAnswers);
          } else {
            setAnswers(newAnswers);
            setQuestionIndex(newQuestionIndex);
          }
        }}
      />
    </div>
  );
};

export default Questions;
