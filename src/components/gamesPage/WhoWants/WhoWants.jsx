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
    let num1, num2, num3, num4, operator1, operator2, operator3;
    let result;

    do {
      // Generate random numbers
      num1 = Math.floor(Math.random() * 20) + 1;
      num2 = Math.floor(Math.random() * 20) + 1;
      num3 = Math.floor(Math.random() * 20) + 1;
      num4 = Math.floor(Math.random() * 20) + 1;

      // Use the same operators set for each level
      if (questionNumber <= 9) {
        operator1 = operators[Math.floor(Math.random() * 4)];
      } else if (questionNumber <= 14) {
        operator1 = operators[Math.floor(Math.random() * 4)];
        operator2 = operators[Math.floor(Math.random() * 4)];
      } else {
        operator1 = operators[Math.floor(Math.random() * 4)];
        operator2 = operators[Math.floor(Math.random() * 4)];
        operator3 = operators[Math.floor(Math.random() * 4)];
      }

      // Calculate result based on the number of operations
      if (!operator3) {
        result = performOperation(num1, num2, operator1);
        if (num3 && operator2) {
          result = performOperation(result, num3, operator2);
        }
      } else {
        result = performOperation(num1, num2, operator1);
        result = performOperation(result, num3, operator2);
        result = performOperation(result, num4, operator3);
      }

      // If the result is not a whole number or is less than 0, repeat the process
    } while (!Number.isInteger(result) || result < 0);

    // Construct the question string
    const question = generateQuestionString(
      num1,
      num2,
      num3,
      num4,
      operator1,
      operator2,
      operator3
    );

    // Construct answers array with shuffled options
    const answers = [{ text: `${result}`, correct: true }];

    const usedIncorrectAnswers = new Set();

    for (let i = 0; i < 3; i++) {
      let incorrectAnswer;
      do {
        // Generate a random incorrect answer
        incorrectAnswer = Math.floor(Math.random() * 5) + result + 1; // Adjust range as needed
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

  const performOperation = (num1, num2, operator) => {
    switch (operator) {
      case "+":
        return num1 + num2;
      case "-":
        return num1 - num2;
      case "x":
        return num1 * num2;
      case "÷":
        return num1 / num2;
      default:
        return num1 + num2; // Default to addition
    }
  };

  // Function to generate question string
  const generateQuestionString = (
    num1,
    num2,
    num3,
    num4,
    operator1,
    operator2,
    operator3
  ) => {
    let question = `What is the result of the following arithmetic expression: ${num1} ${operator1} ${num2}`;
    if (operator2) {
      question += ` ${operator2} ${num3}`;
      if (operator3) {
        question += ` ${operator3} ${num4}`;
      }
    }
    question += "?";
    return question;
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
    if (questionNumber > 1 && questionNumber <= 15) {
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
    } else if (questionNumber > 15) {
      setEarned("15 points");
    }
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
