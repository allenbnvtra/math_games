"use client";
import Identification from "../../../../components/quiz/Identification";
import { useSearchParams } from "next/navigation";
import React from "react";

const page = ({ params }) => {
  const seachParams = useSearchParams();
  const item = seachParams.get("items");
  return <Identification numberOfItems={item} quizId={params.quizId} />;
};

export default page;
