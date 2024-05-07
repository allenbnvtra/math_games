"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const DeleteModal = ({
  isDeleteOpen,
  onCloseDelete,
  handleDeleteQuiz,
  quizName,
}) => {
  return (
    <div
      className={`${
        isDeleteOpen ? "fixed" : "hidden"
      } inset-0 flex justify-center items-center z-[1000] cursor-default`}
    >
      <div className="fixed inset-0 bg-black opacity-40"></div>
      <div className="w-[22rem] flex flex-col bg-white px-5 pb-6 pt-4 z-10 rounded-md">
        <h1 className="text-center text-2xl font-extrabold text-slate-700 cursor-default mb-2">
          Confirmation!
        </h1>

        <h1>Do you really want to delete this quiz/quizzes?</h1>

        <div className="mt-10 flex gap-3 justify-center">
          <button
            className="w-full bg-slate-300 hover:bg-slate-400 text-white font-semibold py-2 rounded-md"
            onClick={onCloseDelete}
          >
            Cancel
          </button>

          <button
            className="w-full bg-red-500 hover:bg-red-400 text-white font-semibold py-2 rounded-md"
            onClick={handleDeleteQuiz}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
