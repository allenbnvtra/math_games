import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";

const AnswerQuiz = ({ quizId }) => {
  const [data, setData] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/questions/${quizId}`);
        setData(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [quizId]);

  const handleAnswerSubmission = () => {
    // Compare user answers with correct answers
    const newFeedback = data.map((question, index) => ({
      question: question.question,
      userAnswer: userAnswers[index],
      answer: question.answer,
      isCorrect: userAnswers[index] === question.answer,
    }));
    setFeedback(newFeedback);
    setSubmitted(true); // Mark quiz as submitted
  };

  return (
    <div className="px-[4rem]">
      <div className="flex text-4xl font-extralight">
        <Link className="cursor-pointer" href="/quiz">
          <TiArrowBackOutline />
        </Link>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          {data.map((question, index) => (
            <div
              key={index}
              className="w-[50rem] border px-5 py-6 mb-4"
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              }}
            >
              <p>
                {index + 1}. {question.question}
              </p>
              <input
                type="text"
                required
                placeholder="Answer"
                className="border w-full px-2 py-1 mt-4 border-slate-300 rounded-sm"
                onChange={(e) => {
                  if (!submitted) {
                    const newAnswers = [...userAnswers];
                    newAnswers[index] = e.target.value;
                    setUserAnswers(newAnswers);
                  }
                }}
                disabled={submitted} // Disable input after submission
              />
              {feedback.length > 0 && (
                <p className="text-gray-500">
                  {submitted ? (question.isCorrect ? "Correct" : "Wrong") : ""}
                </p>
              )}
            </div>
          ))}
          <button
            className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-5 my-5 rounded-md"
            onClick={handleAnswerSubmission}
            disabled={submitted}
          >
            Submit Answers
          </button>
        </div>
      )}
    </div>
  );
};

export default AnswerQuiz;
