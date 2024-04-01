"use client";
import React, { useState } from "react";

const HumanCalculatorPage = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    // You can perform any necessary initialization logic here
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
        <div className="px-20 py-14">
          <div className="flex flex-col bg-white border-4 border-orange-400 rounded-md px-8 py-8">
            <div className="flex text-white font-bold text-lg">
              <div className="flex flex-col px-6 py-2 rounded-md bg-orange-500">
                <h1>Life: 20</h1>
                <h1>Points: 30</h1>
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
                <div className="bg-red-500 px-5 text-center text-white font-bold rounded-md border-2 border-slate-500 cursor-pointer">
                  25
                </div>
                <div className="bg-blue-500 px-5 text-center text-white font-bold rounded-md border-2 border-slate-500 cursor-pointer">
                  19
                </div>
                <div className="bg-green-500 px-5 text-center text-white font-bold rounded-md border-2 border-slate-500 cursor-pointer">
                  15
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HumanCalculatorPage;
