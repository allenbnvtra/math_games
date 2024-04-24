"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Circle from "@/assets/shapes/circle.png";
import Triangle from "@/assets/shapes/triangle.jpg";
import Prism from "@/assets/shapes/Prism.png";
import Cylinder from "@/assets/shapes/cylinder.jpg";
import Pyramid from "@/assets/shapes/pyramid.webp";
import Square from "@/assets/shapes/square.png";
import Rectangle from "@/assets/shapes/rectangle.png";
import Rhombus from "@/assets/shapes/rhombus.png";
import Oval from "@/assets/shapes/oval.png";
import Parallelogram from "@/assets/shapes/parallelogram.webp";
import Ellipse from "@/assets/shapes/ellipse.webp";
import Crescent from "@/assets/shapes/crescent.png";
import Pentagon from "@/assets/shapes/pentagon.png";
import Decagon from "@/assets/shapes/decagon.png";
import Nonagon from "@/assets/shapes/nonagon.jpg";
import Cone from "@/assets/shapes/cone.png";

import Link from "next/link";
import { FaHome } from "react-icons/fa";

const ShapeGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [shapes, setShapes] = useState([
    { name: "Circle", image: Circle },
    { name: "Triangle", image: Triangle },
    { name: "Prism", image: Prism },
    { name: "Cylinder", image: Cylinder },
    { name: "Pyramid", image: Pyramid },
    { name: "Square", image: Square },
    { name: "Rectangle", image: Rectangle },
    { name: "Rhombus", image: Rhombus },
    { name: "Oval", image: Oval },
    { name: "Parallelogram", image: Parallelogram },
    { name: "Ellipse", image: Ellipse },
    { name: "Crescent", image: Crescent },
    { name: "Pentagon", image: Pentagon },
    { name: "Decagon", image: Decagon },
    { name: "Nonagon", image: Nonagon },
    { name: "Cone", image: Cone },
  ]);

  const [questionShape, setQuestionShape] = useState({});
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [life, setLife] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    if (gameStarted) generateQuestion();
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLife(3);
    setGameOver(false);
    setQuestionCount(0);
  };

  const generateQuestion = () => {
    if (questionCount >= 10) {
      setGameOver(true);
      return;
    }

    const newQuestionIndex = Math.floor(Math.random() * shapes.length);
    const newQuestionShape = shapes[newQuestionIndex];
    setQuestionShape(newQuestionShape);

    const filteredShapes = shapes.filter(
      (shape) => shape.name !== newQuestionShape.name
    );

    // Remove the current question shape from the choices
    const randomChoices = [];
    while (randomChoices.length < 2) {
      const randomIndex = Math.floor(Math.random() * filteredShapes.length);
      randomChoices.push(filteredShapes[randomIndex]);
      filteredShapes.splice(randomIndex, 1);
    }
    randomChoices.push(newQuestionShape);
    const shuffledChoices = randomChoices.sort(() => Math.random() - 0.5);
    setChoices(shuffledChoices);

    setQuestionCount((count) => count + 1);
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
            <div className="flex justify-between text-white font-bold text-lg mb-10">
              <div className="flex flex-col px-6 py-2 rounded-md bg-orange-500">
                <h1>Life: {life}</h1>
                <h1>Score: {score}</h1>
              </div>

              <div className="pt-5 pl-36 text-3xl cursor-pointer text-black">
                <Link href="/games">
                  <FaHome />
                </Link>
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
          <p className="text-lg text-white font-semibold">
            Congratulations! You have earned {score} points.
          </p>
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
