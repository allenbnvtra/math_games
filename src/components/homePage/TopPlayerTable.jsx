"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Star from "@/assets/topLeader.webp";
import axios from "axios";

const TopPlayerTable = ({ title }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await axios.get(`/api/score`);
        setLeaderboard(response.data.leaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div>
      <div className="w-[18rem] flex flex-col bg-white">
        <h1 className="flex gap-1 py-4 pl-3 text-slate-600 text-lg font-medium">
          <Image src={Star} width={25} alt="" /> School Ranking
        </h1>
        <table className="border-none font-light">
          <tbody className="border-none">
            {leaderboard.map((player, index) => (
              <tr key={index} className="border-none">
                <td className="py-3 px-6 text-left flex gap-2 text-slate-700 border-none">
                  {player.name}
                </td>
                <td className="py-3 px-14 text-left text-red-600 border-none">
                  {index + 1}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopPlayerTable;
