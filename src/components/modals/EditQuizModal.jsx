"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";

const EditQuizModal = ({
  isEditOpen,
  onClose,
  id,
  selectQuestion,
  selectAns,
}) => {
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion(selectQuestion);
    setAnswers(selectAns);
  }, [selectQuestion, selectAns]);

  const handleUpdateQuiz = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`/api/questions/${id}`, {
        question,
        answers,
      });

      onClose();
    } catch (error) {
      console.error("Error updating quiz:", error);
    }
  };

  return (
    <div
      className={`${
        isEditOpen ? "fixed" : "hidden"
      } inset-0 flex justify-center items-center z-50 cursor-default`}
    >
      <div className="fixed inset-0 bg-black opacity-40"></div>
      <div className="w-[22rem] flex flex-col bg-white px-5 pb-6 pt-4 z-10 rounded-md">
        <div className="flex justify-end text-2xl">
          <button
            className="bg-slate-100 rounded-full hover:bg-slate-200"
            onClick={onClose}
          >
            <IoIosClose />
          </button>
        </div>
        <h1 className="text-center text-2xl font-extrabold text-slate-700 cursor-default mb-2">
          Edit
        </h1>

        <form onSubmit={handleUpdateQuiz}>
          <div>
            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm text-slate-600" htmlFor="question">
                Question
              </label>
              <input
                required
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1 mb-6">
              <label className="text-sm text-slate-600" htmlFor="answers">
                Answers (Separated by commas)
              </label>
              <input
                required
                className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
                type="text"
                id="answers"
                value={answers?.join(",")} // Convert array to string with commas
                onChange={(e) => setAnswers(e.target.value.split(","))} // Convert string to array on change
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditQuizModal;
