import React from "react";
import TopPlayerTable from "./TopPlayerTable";

const Leaderboard = () => {
  return (
    <div className="bg-orange-100 py-6 px-[14rem]">
      <div
        className="flex justify-center"
        style={{
          background:
            "url(//static.arcademics.com/images/leaderboardsStar.png) center repeat-x",
        }}
      >
        <h1 className="text-orange-500 text-2xl px-10 bg-orange-100">
          Today's Top Players
        </h1>
      </div>

      <div className="flex justify-center mt-8 gap-8">
        <TopPlayerTable title="School Ranking" />
        <TopPlayerTable title="Global Ranking" />
      </div>
    </div>
  );
};

export default Leaderboard;
