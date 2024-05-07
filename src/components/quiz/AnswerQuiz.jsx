"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import EditQuizModal from "../modals/EditQuizModal";
import { useSession } from "next-auth/react";

const AnswerQuiz = ({ quizId }) => {
  const [data, setData] = useState([]);
  const [userAnswers, setUserAnswers] = useState(() => {
    return data.map(() => "");
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedCorrect, setSelectedCorrect] = useState(null);
  const [questionType, setQuestionType] = useState(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/questions/${quizId}`);
        setData(res.data.data);
        setUserAnswers(() => {
          return res.data.data.map(() => "");
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [quizId]);

  const handleAnswerSubmission = () => {
    const newFeedback = data.map((question, index) => ({
      question: question.question,
      userAnswer: userAnswers[index],
      answer: question.answer,
      isCorrect:
        question.quizID.quizType === "choices"
          ? userAnswers[index] === question.correctAnswer
          : userAnswers[index].toLowerCase() ===
            question.correctAnswer.toLowerCase(),
    }));
    setFeedback(newFeedback);
    setSubmitted(true);
  };

  const handleEditClick = (questionId, question, answer, correct, type) => {
    setSelectedQuestionId(questionId);
    setSelectedQuestion(question);
    setSelectedAnswer(answer);
    setSelectedCorrect(correct);
    setQuestionType(type);
    setIsEditOpen(true);
  };

  const refreshData = async () => {
    try {
      const res = await axios.get(`/api/questions/${quizId}`);
      setData(res.data.data);
      setUserAnswers(() => {
        return res.data.data.map(() => "");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-[4rem]">
      <EditQuizModal
        id={selectedQuestionId}
        selectQuestion={selectedQuestion}
        selectAns={selectedAnswer}
        isEditOpen={isEditOpen}
        quizType={questionType}
        selectCorrect={selectedCorrect}
        onClose={() => setIsEditOpen(false)}
        refreshData={refreshData} // Pass the refreshData function to EditQuizModal
      />
      <div className="flex text-4xl py-7 font-extralight">
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
              <div className="flex justify-between">
                <p>
                  {index + 1}. {question.question}
                </p>
                {status === "authenticated" &&
                  session?.user?.role === "teacher" && (
                    <button
                      onClick={() =>
                        handleEditClick(
                          question._id,
                          question.question,
                          question.answers,
                          question.correctAnswer,
                          question.quizID.quizType
                        )
                      }
                      className="bg-orange-600 text-white px-5 py-1 rounded-md"
                    >
                      Edit
                    </button>
                  )}
              </div>

              {question.quizID.quizType === "choices" &&
              Array.isArray(question.answers) ? (
                <div>
                  {question.answers.map((choice, choiceIndex) => (
                    <div key={choiceIndex}>
                      <input
                        type="radio"
                        id={`choice-${index}-${choiceIndex}`}
                        name={`choices-${index}`}
                        value={choice}
                        onChange={(e) => {
                          if (!submitted) {
                            setUserAnswers((prevState) => {
                              const newState = [...prevState];
                              newState[index] = e.target.value;
                              return newState;
                            });
                          }
                        }}
                        disabled={submitted}
                      />
                      <label
                        className="ml-2"
                        htmlFor={`choice-${index}-${choiceIndex}`}
                      >
                        {choice}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  type="text"
                  required
                  placeholder="Answer"
                  className="border w-full px-2 py-1 mt-4 border-slate-300 rounded-sm"
                  onChange={(e) => {
                    if (!submitted) {
                      setUserAnswers((prevState) => {
                        const newState = [...prevState];
                        newState[index] = e.target.value;
                        return newState;
                      });
                    }
                  }}
                  disabled={submitted}
                />
              )}

              {feedback.length > 0 && (
                <div>
                  <p className="text-gray-500">
                    {submitted && feedback[index].isCorrect
                      ? "Correct"
                      : "Wrong"}
                  </p>
                </div>
              )}
            </div>
          ))}
          {submitted ? (
            <Link
              href="/quiz"
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-5 my-5 rounded-md"
              onClick={handleAnswerSubmission}
              disabled={submitted}
            >
              Mark as done
            </Link>
          ) : (
            <button
              className="bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 px-5 my-5 rounded-md"
              onClick={handleAnswerSubmission}
              disabled={submitted}
            >
              Submit Answers
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AnswerQuiz;
