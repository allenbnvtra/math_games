"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Circle from "@/assets/circle.png";
import Triangle from "@/assets/triangle.jpg";
import Prism from "@/assets/Prism.png";

import Link from "next/link";

const ShapeGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [shapes, setShapes] = useState([
    { name: "Circle", image: Circle },
    { name: "Triangle", image: Triangle },
    { name: "Prism", image: Prism },
  ]);

  const [questionShape, setQuestionShape] = useState({});
  const [choices, setChoices] = useState([]);

  const [score, setScore] = useState(0);
  const [life, setLife] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (gameStarted) generateQuestion();
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLife(3);
    setGameOver(false);
  };

  const generateQuestion = () => {
    const newQuestionIndex = Math.floor(Math.random() * shapes.length);
    const newQuestionShape = shapes[newQuestionIndex];
    setQuestionShape(newQuestionShape);

    // Randomly select two other shapes as choices
    const filteredShapes = shapes.filter(
      (shape) => shape.name !== newQuestionShape.name
    );
    const randomChoices = [];
    while (randomChoices.length < 2) {
      const randomIndex = Math.floor(Math.random() * filteredShapes.length);
      randomChoices.push(filteredShapes[randomIndex]);
      filteredShapes.splice(randomIndex, 1);
    }
    randomChoices.push(newQuestionShape);
    const shuffledChoices = randomChoices.sort(() => Math.random() - 0.5);
    setChoices(shuffledChoices);
  };

  const handleAnswerClick = (selectedShape) => {
    if (gameOver) return;
    if (selectedShape === questionShape.name) {
      setScore(score + 1);
    } else {
      setLife(life - 1);
      if (life === 1) {
        setGameOver(true);
      }
    }
    generateQuestion();
  };

  return (
    <div className="shape-game">
      {!gameStarted && (
        <div className="flex justify-center items-center h-screen">
          <button
            className="bg-blue-500 px-5 py-2 text-white font-bold rounded-md border-2 border-slate-500 cursor-pointer"
            onClick={startGame}
          >
            Start Game
          </button>
        </div>
      )}
      {gameStarted && !gameOver && (
        <div className="px-20 py-14">
          <div className="flex flex-col bg-white border-4 border-orange-400 rounded-md px-8 py-8">
            <div className="flex text-white font-bold text-lg">
              <div className="flex flex-col px-6 py-2 rounded-md bg-orange-500">
                <h1>Life: {life}</h1>
                <h1>Score: {score}</h1>
              </div>
            </div>
            <div className="flex justify-center items-center gap-[9rem]">
              <div className="flex gap-2 text-[10rem] font-bold justify-center">
                <Image src={questionShape.image} height={400} alt="" />
              </div>
              <div className="flex flex-col gap-5 text-[6rem]">
                {choices.map((choice, index) => (
                  <div
                    key={index}
                    className="bg-orange-400 px-5 text-center text-white font-bold rounded-md border-2 border-slate-500 cursor-pointer"
                    onClick={() => handleAnswerClick(choice.name)}
                  >
                    {choice.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {gameOver && (
        <div className="flex flex-col gap-5 justify-center items-center h-screen">
          <h1 className="text-4xl font-bold text-red-500">Game Over!</h1>
          <Link href="/games">
            <button className="bg-orange-500 text-white px-5 py-2 font-bold rounded-md hover:bg-orange-400">
              Play more games
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShapeGame;
