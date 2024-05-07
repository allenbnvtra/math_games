"use client";

import React, { useEffect, useState } from "react";
import AddQuizModal from "../modals/AddQuizModal";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import DeleteModal from "../modals/DeleteModal";
import { TiArrowBackOutline } from "react-icons/ti";

const QuizPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [openQuizModal, setOpenQuizModal] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/quiz");
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(isDeleteOpen);

  const handleCheckboxChange = (quizId) => {
    if (selectedItems.includes(quizId)) {
      setSelectedItems(selectedItems.filter((id) => id !== quizId));
    } else {
      setSelectedItems([...selectedItems, quizId]);
    }
  };

  const handleDeleteSelected = async () => {
    try {
      for (const quizId of selectedItems) {
        await axios.delete(`/api/quiz/${quizId}`);
      }

      fetchData();

      setSelectedItems([]);
      setIsDeleteOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-5 md:px-28 h-screen">
      <div className="flex text-4xl py-7 font-extralight">
        <Link className="cursor-pointer" href="/">
          <TiArrowBackOutline />
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-5">Quiz</h1>
      {status === "authenticated" && session?.user?.role === "teacher" && (
        <div className="flex">
          <AddQuizModal
            isQuizOpen={openQuizModal}
            onClose={() => setOpenQuizModal(false)}
          />
          <button
            onClick={() => setOpenQuizModal(true)}
            className="bg-orange-500 py-3 px-5 rounded-md text-white font-bold cursor-pointer"
          >
            Create new quiz
          </button>
        </div>
      )}

      {status === "authenticated" ? (
        <div className="flex flex-wrap mt-7">
          {data.length === 0 ? (
            <p>No quizzes found.</p>
          ) : (
            data.map((quiz) => (
              <div
                key={quiz._id}
                className="flex items-center gap-10 border mr-3 mb-5 px-5 py-3 cursor-pointer"
                style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
              >
                {status === "authenticated" &&
                  session?.user?.role === "teacher" && (
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(quiz._id)}
                      onChange={() => handleCheckboxChange(quiz._id)}
                    />
                  )}
                <Link
                  className="flex gap-3 items-center"
                  href={`/quiz/${quiz._id}`}
                >
                  <div className="flex flex-col gap-1">
                    <p className="font-semibold text-xl">{quiz.title}</p>
                  </div>
                  <div className="text-4xl">
                    <MdOutlineKeyboardArrowRight />
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      ) : (
        <p className="flex justify-center items-center h-screen font-normal text-2xl">
          Please log in to access the quiz page.
        </p>
      )}

      {selectedItems.length > 0 && (
        <div className="flex justify-end mt-5">
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="bg-red-500 py-3 px-5 mb-10 rounded-md text-white font-bold cursor-pointer"
          >
            Delete Selected
          </button>
        </div>
      )}
      <DeleteModal
        isDeleteOpen={isDeleteOpen}
        onCloseDelete={() => setIsDeleteOpen(false)}
        handleDeleteQuiz={handleDeleteSelected}
      />
    </div>
  );
};

export default QuizPage;
