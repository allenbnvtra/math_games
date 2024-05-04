"use client";
import React, { useEffect, useState } from "react";
import AddQuizModal from "../modals/AddQuizModal";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";

const QuizPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const session = useSession();
  const mySession = session?.data?.user;

  useEffect(() => {
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

    fetchData();
  }, []);

  const [openQuizModal, setOpenQuizModal] = useState(false);

  return (
    <div className="px-28">
      {mySession?.role === "teacher" && (
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

      <div className="flex flex-wrap mt-7">
        {data.map((quiz) => (
          <Link
            href={`/quiz/${quiz._id}`}
            key={quiz._id}
            className="flex items-center gap-10 border mr-3 mb-5 px-5 py-3 cursor-pointer"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-xl">{quiz.title}</p>
              <p>Number of Items: {quiz.numberOfItems}</p>
              {/* <p>Score: {quiz.score}</p> */}
            </div>
            <div className="text-4xl">
              <MdOutlineKeyboardArrowRight />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
