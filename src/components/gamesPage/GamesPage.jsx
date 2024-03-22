import React from "react";
import GameCards from "./GameCards";

const GamesPage = () => {
  return (
    <div className="bg-orange-100">
      <div className="px-20 py-5">
        <h1 className="text-2xl text-slate-700 font-bold mb-4">
          Explore Games
        </h1>

        <div className="px-10 flex flex-wrap justify-center gap-3">
          <GameCards />
          <GameCards />
          <GameCards />
          <GameCards />
          <GameCards />
          <GameCards />
          <GameCards />
          <GameCards />
          <GameCards />
          <GameCards />
          <GameCards />
          <GameCards />
          <GameCards />
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
