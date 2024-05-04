"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";

const AddQuizModal = ({ isQuizOpen, onClose }) => {
  const [numberOfItems, setNumberOfItems] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();

  const handleCreateQuiz = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/quiz", {
        numberOfItems,
        title,
      });

      console.log(res.data);

      if (res.status === 200 || res.status === 201) {
        router.push(`/quiz/${res.data.data._id}/create?items=${numberOfItems}`);
      } else {
        console.error("Unexpected response:", res);
      }
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  return (
    <div
      className={`${
        isQuizOpen ? "fixed" : "hidden"
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
          Create a quiz
        </h1>

        <div>
          <div className="flex flex-col gap-1 mb-6">
            <label className="text-sm text-slate-600" htmlFor="title">
              Quiz Title <span className="text-red-600">*</span>
            </label>
            <input
              required
              className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label className="text-sm text-slate-600" htmlFor="items">
              No. of items <span className="text-red-600">*</span>
            </label>
            <input
              required
              className="border border-slate-300 rounded-md text-sm px-2 py-1 focus:border-orange-600 focus:outline-none"
              type="number"
              id="numberOfItems"
              value={numberOfItems}
              onChange={(e) => setNumberOfItems(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-semibold py-2 rounded-md"
            onClick={handleCreateQuiz}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuizModal;
