"use client";
import React, { useState, useEffect } from "react";

const HumanCalculatorPage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [gameStarted, timeLeft]);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="human-calculator">
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
      {gameStarted && (
        <div className="px-[9rem] py-20">
          <div className="flex flex-col bg-white border-4 border-orange-400 rounded-md px-8 py-8">
            <div className="flex justify-between mb-5 text-white font-bold text-lg">
              <div className="flex flex-col px-6 py-2 rounded-md bg-orange-500">
                <h1>Life: 20</h1>
                <h1>Points: 30</h1>
              </div>

              <div className="mt-4 text-center text-red-500 font-bold">
                Time Left: {timeLeft} seconds
              </div>
            </div>
            <div className="flex justify-center items-center gap-[9rem]">
              <div className="flex gap-2 text-[10rem] font-bold justify-center">
                <span className="italic">9</span>
                <span className="text-orange-600 italic">+</span>
                <span className="italic">10</span>
                <span className="italic">=?</span>
              </div>
              <div className="flex flex-col gap-5 text-[6rem]">
                <h1 className="bg-red-500 px-5 text-center text-white font-bold rounded-md border-2 border-slate-500 cursor-pointer">
                  25
                </h1>
                <h1 className="bg-blue-500 px-5 text-center text-white font-bold rounded-md border-2 border-slate-500 cursor-pointer">
                  19
                </h1>
                <h1 className="bg-green-500 px-5 text-center text-white font-bold rounded-md border-2 border-slate-500 cursor-pointer">
                  15
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanCalculatorPage;
