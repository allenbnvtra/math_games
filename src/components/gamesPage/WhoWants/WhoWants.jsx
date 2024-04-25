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
    const num4 = Math.floor(Math.random() * 20) + 1;
    const operator1 = operators[Math.floor(Math.random() * operators.length)];

    let numOperations, operator2, operator3;

    // Determine the number of operations based on the question number
    if (questionNumber <= 5) {
      numOperations = 1;
    } else if (questionNumber <= 10) {
      numOperations = 2;
      operator2 = operators[Math.floor(Math.random() * operators.length)];
    } else {
      numOperations = 3;
      operator2 = operators[Math.floor(Math.random() * operators.length)];
      operator3 = operators[Math.floor(Math.random() * operators.length)];
    }

    let result;

    // Calculate result based on the number of operations
    switch (numOperations) {
      case 1:
        result = performOperation(num1, num2, operator1);
        break;
      case 2:
        result = performOperation(
          performOperation(num1, num2, operator1),
          num3,
          operator2
        );
        break;
      case 3:
        result = performOperation(
          performOperation(
            performOperation(num1, num2, operator1),
            num3,
            operator2
          ),
          num4,
          operator3
        );
        break;
      default:
        result = performOperation(num1, num2, operator1);
    }

    // Construct the question string
    const question = generateQuestionString(
      num1,
      num2,
      num3,
      num4,
      operator1,
      operator2,
      operator3,
      numOperations
    );

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
    operator3,
    numOperations
  ) => {
    let question = `What is the result of the following arithmetic expression: ${num1} ${operator1} ${num2}`;
    if (numOperations > 1) {
      question += ` ${operator2} ${num3}`;
      if (numOperations > 2) {
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
