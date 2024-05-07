"use client";
import AnswerQuiz from "../../../components/quiz/AnswerQuiz";
import React from "react";

const page = ({ params }) => {
  return <AnswerQuiz quizId={params.quizId} />;
};

export default page;
