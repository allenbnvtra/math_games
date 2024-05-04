"use client";
import AnswerQuiz from "@/components/quiz/AnswerQuiz";
import { useRouter } from "next/navigation";
import React from "react";

const page = ({ params }) => {
  return <AnswerQuiz quizId={params.quizId} />;
};

export default page;
