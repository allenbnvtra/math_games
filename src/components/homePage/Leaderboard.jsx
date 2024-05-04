"use client";

import React, { useState, useEffect } from "react";
import TopPlayerTable from "./TopPlayerTable";

const Leaderboard = () => {
  return (
    <div className="bg-orange-100 py-6">
      <div
        className="justify-center hidden"
        style={{
          background:
            "url(//static.arcademics.com/images/leaderboardsStar.png) center repeat-x",
        }}
      >
        <h1 className="text-orange-500 text-sm px-10 bg-orange-100">
          Today's Top Players
        </h1>
      </div>

      <div className="flex flex-col items-center justify-center mt-8 gap-8 md:flex-row">
        <TopPlayerTable />
        {/* <TopPlayerTable
          title="Global Ranking"
          leaderboard={globalLeaderboard}
        /> */}
      </div>
    </div>
  );
};

export default Leaderboard;
