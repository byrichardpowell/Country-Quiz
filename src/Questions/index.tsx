import React, { useState } from "react";
import Question from "./Question";

interface Props {
  questions: Array<{
    question: string;
    options: Array<{
      name: string;
    }>;
  }>;
}

const Questions: React.FC<Props> = ({ questions }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const question = questions[questionIndex];
  return (
    <div>
      <h2>
        Question {questionIndex + 1} of {questions.length + 1}
      </h2>
      <Question
        question={question.question}
        options={question.options}
        didSubmit={answer => {
          setAnswers([...answers, ...[answer]]);
          setQuestionIndex(questionIndex + 1);
        }}
      />
    </div>
  );
};

export default Questions;
