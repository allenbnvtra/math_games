"use client";

import { useEffect, useMemo, useState } from "react";
import Start from "./Start";
import Trivia from "./Trivia";
import Timer from "./Timer";

import { FaHome } from "react-icons/fa";
import Link from "next/link";

const WhoWants = () => {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("0");

  const generateRandomQuestion = () => {
    const operators = ["+", "-", "x", "÷"];
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const num3 = Math.floor(Math.random() * 20) + 1;
    const operator1 = operators[Math.floor(Math.random() * operators.length)];
    const operator2 = operators[Math.floor(Math.random() * operators.length)];
    let result;

    // Calculate intermediate result for the first operation
    let intermediateResult;
    switch (operator1) {
      case "+":
        intermediateResult = num1 + num2;
        break;
      case "-":
        intermediateResult = num1 - num2;
        break;
      case "x":
        intermediateResult = num1 * num2;
        break;
      case "÷":
        // Ensure result is an integer
        intermediateResult = Math.floor(num1 / num2);
        break;
      default:
        intermediateResult = num1 + num2; // Default to addition
    }

    // Calculate final result using the second operation
    switch (operator2) {
      case "+":
        result = intermediateResult + num3;
        break;
      case "-":
        result = intermediateResult - num3;
        break;
      case "x":
        result = intermediateResult * num3;
        break;
      case "÷":
        // Ensure result is an integer
        result = Math.floor(intermediateResult / num3);
        break;
      default:
        result = intermediateResult + num3; // Default to addition
    }

    // Construct the question string
    const question = `What is the result of the following arithmetic expression: ${num1} ${operator1} ${num2} ${operator2} ${num3}?`;

    // Construct answers array with shuffled options
    const answers = [{ text: `${result}`, correct: true }];

    const usedIncorrectAnswers = new Set();

    for (let i = 0; i < 3; i++) {
      let incorrectAnswer;
      do {
        // Generate a random incorrect answer
        incorrectAnswer = Math.floor(Math.random() * 40) + 1;
      } while (
        incorrectAnswer === result ||
        usedIncorrectAnswers.has(incorrectAnswer)
      ); // Ensure the incorrect answer is not equal to the correct answer or repeated

      answers.push({ text: `${incorrectAnswer}`, correct: false });
      usedIncorrectAnswers.add(incorrectAnswer);
    }

    // Shuffle the answers array
    answers.sort(() => Math.random() - 0.5);

    return { question, answers };
  };

  const generateQuestions = (numQuestions) => {
    const questions = [];
    for (let i = 0; i < numQuestions; i++) {
      questions.push(generateRandomQuestion());
    }
    return questions;
  };

  const data = generateQuestions(15);

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "1 point" },
        { id: 2, amount: "2 points" },
        { id: 3, amount: "3 points" },
        { id: 4, amount: "4 points" },
        { id: 5, amount: "5 points" },
        { id: 6, amount: "6 points" },
        { id: 7, amount: "7 points" },
        { id: 8, amount: "8 points" },
        { id: 9, amount: "9 points" },
        { id: 10, amount: "10 points" },
        { id: 11, amount: "11 points" },
        { id: 12, amount: "12 points" },
        { id: 13, amount: "13 points" },
        { id: 14, amount: "14 points" },
        { id: 15, amount: "15 points" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            <div className="pt-5 pl-5 text-3xl cursor-pointer">
              <Link href="/games">
                <FaHome />
              </Link>
            </div>
            {timeOut ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default WhoWants;
