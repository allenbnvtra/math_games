import React from "react";
import GameCards from "./GameCards";
import Millionaire from "@/assets/millionaire.jpeg";
import Shapes from "@/assets/shapes.jpg";
import Sudoku from "@/assets/sudoku.jpeg";

const GamesPage = () => {
  return (
    <div
      className="h-screen"
      style={{
        background:
          "linear-gradient(111.4deg, rgb(209, 231, 235) 7.4%, rgb(238, 219, 199) 51.4%, rgb(255, 159, 122) 82.6%, rgb(255, 109, 58) 100.2%)",
      }}
    >
      <div className="px-20 py-5">
        <h1 className="text-3xl text-slate-800 font-extrabold mb-4">
          Explore Games
        </h1>

        <div className="px-10 flex flex-wrap justify-center gap-5">
          <GameCards
            imgUrl={Sudoku}
            gameUrl="sudoku"
            gameTitle="Sudoku Puzzle"
          />
          <GameCards
            imgUrl={Millionaire}
            gameUrl="who-wants-to-be-a-millionaire"
            gameTitle="Math Millionaire"
          />
          <GameCards imgUrl={Shapes} gameUrl="shape" gameTitle="Shape It" />
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
