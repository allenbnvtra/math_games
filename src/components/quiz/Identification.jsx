"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TiArrowBackOutline } from "react-icons/ti";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const Identification = ({ numberOfItems, quizId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(
    Array.from({ length: numberOfItems }, (_, index) => ({
      question: "",
      answer: "",
    }))
  );

  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };
  console.log(quizId);
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);

    try {
      await axios.post(`/api/quiz/${quizId}`, {
        formData,
      });

      router.push("/quiz");
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="px-[4rem] py-5">
      <div className="flex text-4xl font-extralight">
        <Link className="cursor-pointer" href="/quiz">
          <TiArrowBackOutline />
        </Link>
      </div>

      <div className="flex justify-center flex-col items-center h-full">
        <h2 className="text-2xl font-bold mb-4">Identification Quiz</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center flex-wrap md:mr-10">
            {Array.from({ length: numberOfItems }, (_, index) => (
              <div
                key={index}
                className="mb-5 md:mr-4 gap-6 py-7 px-6 rounded-md"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.16) 0px 1px 6px, rgba(0, 0, 0, 0.23) 0px 1px 6px",
                }}
              >
                <div>
                  <p className="flex justify-end text-lg mb-2">{index + 1}.</p>
                  <label
                    htmlFor={`question-${index + 1}`}
                    className="block text-md font-normal mb-1"
                  >
                    Question
                  </label>
                  <input
                    type="text"
                    id={`question-${index + 1}`}
                    name={`question-${index + 1}`}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-600"
                    placeholder={`Enter question ${index + 1}`}
                    value={formData[index].question}
                    onChange={(e) =>
                      handleInputChange(index, "question", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor={`answer-${index + 1}`}
                    className="block text-md mt-2 mb-1"
                  >
                    Answer
                  </label>
                  <input
                    type="text"
                    id={`answer-${index + 1}`}
                    name={`answer-${index + 1}`}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-600"
                    placeholder={`Enter answer ${index + 1}`}
                    value={formData[index].answer}
                    onChange={(e) =>
                      handleInputChange(index, "answer", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="bg-orange-600 text-white font-semibold py-2 px-6 rounded-md hover:bg-orange-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Identification;
