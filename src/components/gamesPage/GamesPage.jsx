import React from "react";
import GameCards from "./GameCards";
import Millionaire from "@/assets/millionaire.jpeg";
import Shapes from "@/assets/shapes.jpg";

const GamesPage = () => {
  return (
    <div className="bg-orange-100">
      <div className="px-20 py-5">
        <h1 className="text-2xl text-slate-700 font-bold mb-4">
          Explore Games
        </h1>

        <div className="px-10 flex flex-wrap justify-center gap-3">
          <GameCards
            imgUrl={Shapes}
            gameUrl="shape-counting"
            gameTitle="Shape Counting"
          />
          <GameCards
            imgUrl={Millionaire}
            gameUrl="who-wants-to-be-a-millionaire"
            gameTitle="Who wants to be a millionaire"
          />
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
