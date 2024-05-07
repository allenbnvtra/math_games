"use client";
import React, { useState } from "react";
import Link from "next/link";
import { TiArrowBackOutline } from "react-icons/ti";
import axios from "axios";
import { useRouter } from "next/navigation";

const Identification = ({ numberOfItems, quizId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(
    Array.from({ length: numberOfItems }, (_, index) => ({
      correctAnswer: "",
      question: "",
      answers: [], // Change to array
    }))
  );

  const [quizType, setQuizType] = useState("identification"); // Default quiz type

  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);

    try {
      const res = await axios.post(`/api/quiz/${quizId}`, {
        formData,
      });

      console.log(res);
      router.push("/quiz");
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  const addAnswer = (index) => {
    const newFormData = [...formData];
    newFormData[index].answers.push(""); // Push an empty string as a placeholder
    setFormData(newFormData);
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
        <form className="w-[50rem]" onSubmit={handleSubmit}>
          <div className="flex w-full flex-col items-center flex-wrap md:mr-10">
            {Array.from({ length: numberOfItems }, (_, index) => (
              <div
                key={index}
                className="mb-5 w-full md:mr-4 gap-6 py-7 px-6 rounded-md"
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
                    className="border w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-600"
                    placeholder={`Enter question ${index + 1}`}
                    value={formData[index].question}
                    onChange={(e) =>
                      handleInputChange(index, "question", e.target.value)
                    }
                  />

                  <label
                    htmlFor={`correctAnswer-${index + 1}`}
                    className="block text-md font-normal mb-1"
                  >
                    Correct Answer
                  </label>
                  <input
                    type="text"
                    id={`correctAnswer-${index + 1}`}
                    name={`correctAnswer-${index + 1}`}
                    className="border w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-600"
                    placeholder={`Enter correct Answer ${index + 1}`}
                    value={formData[index].correctAnswer}
                    onChange={(e) =>
                      handleInputChange(index, "correctAnswer", e.target.value)
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
                  {quizType === "choices" ? (
                    <>
                      {formData[index].answers.map((ans, idx) => (
                        <input
                          key={idx}
                          type="text"
                          id={`answer-${index + 1}-${idx + 1}`}
                          name={`answer-${index + 1}-${idx + 1}`}
                          className="border w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-600"
                          placeholder={`Enter answer ${idx + 1}`}
                          value={ans}
                          onChange={(e) => {
                            const newFormData = [...formData];
                            newFormData[index].answers[idx] = e.target.value;
                            setFormData(newFormData);
                          }}
                        />
                      ))}
                      <button
                        type="button"
                        className="bg-orange-600 text-white px-5 py-2 rounded-md mt-3"
                        onClick={() => addAnswer(index)}
                      >
                        Add Answer
                      </button>
                    </>
                  ) : (
                    <input
                      type="text"
                      id={`answer-${index + 1}`}
                      name={`answer-${index + 1}`}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-orange-600"
                      placeholder={`Enter answer ${index + 1}`}
                      value={formData[index].answers}
                      onChange={(e) =>
                        handleInputChange(index, "answers", e.target.value)
                      }
                    />
                  )}
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
        <div>
          <label>
            Quiz Type:
            <select
              value={quizType}
              className="px-5 py-1"
              onChange={(e) => setQuizType(e.target.value)}
            >
              <option value="identification">Identification</option>
              <option value="choices">Choices</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Identification;
