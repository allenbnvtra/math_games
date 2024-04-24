import React from "react";
import GameCards from "./GameCards";
import Millionaire from "@/assets/millionaire.jpeg";
import Shapes from "@/assets/shapes.jpg";
import Sudoku from "@/assets/sudoku.jpeg";
import Link from "next/link";

const helpMessages = {
  sudoku: {
    id: "sudoku",
    message: `Objective: The goal of Sudoku is to fill a 9x9 grid with numbers so that each row, column, and 3x3 subgrid contains all of the digits from 1 to 9.
    Starting Grid: Sudoku puzzles start with some cells already filled with numbers. These initial numbers provide a starting point for solving the puzzle.
    Rules:
    Each row must contain all numbers from 1 to 9 without repetition.
    Each column must contain all numbers from 1 to 9 without repetition.
    Each 3x3 subgrid (or region) must contain all numbers from 1 to 9 without repetition.
    Solving Strategy:
    Look for rows, columns, or regions with fewest missing numbers. These are typically easier to solve.
    Identify numbers that can only fit in one cell within a row, column, or region. This is often referred to as "elimination."
    Use logical deduction and elimination to gradually fill in the grid. If you're stuck, try making educated guesses and continue from there.
    Trial and Error: Sometimes, you may need to try different numbers in a cell to see which one fits. If a number conflicts with the rules, backtrack and try a different number.
    Patience and Practice: Sudoku requires patience and practice. Start with easier puzzles and gradually move to more challenging ones as you become more comfortable with the rules and strategies.
    Remember, there's always a unique solution to every Sudoku puzzle, and no math or arithmetic is required. Enjoy the challenge of solving Sudoku puzzles!`,
  },
  // Add more games with their respective help messages here
};

const GamesPage = () => {
  return (
    <div
      className="h-screen"
      style={{
        background:
          "linear-gradient(111.4deg, rgb(209, 231, 235) 7.4%, rgb(238, 219, 199) 51.4%, rgb(255, 159, 122) 82.6%, rgb(255, 109, 58) 100.2%)",
      }}
    >
      <div className="px-20 py-5 flex flex-col gap-10 ">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl text-slate-800 font-extrabold mb-4">
            Explore Games
          </h1>

          <Link
            className="bg-orange-600 text-white px-5 py-3 rounded-md"
            href="/"
          >
            Go back Home
          </Link>
        </div>

        <div className="px-10 flex flex-wrap justify-center gap-5">
          <GameCards
            imgUrl={Sudoku}
            gameUrl="sudoku"
            gameTitle="Sudoku Puzzle"
            helpMessage="Objective: The goal of Sudoku is to fill a 9x9 grid with numbers so that each row, column, and 3x3 subgrid contains all of the digits from 1 to 9.
            Starting Grid: Sudoku puzzles start with some cells already filled with numbers. These initial numbers provide a starting point for solving the puzzle.
            Rules:
            Each row must contain all numbers from 1 to 9 without repetition.
            Each column must contain all numbers from 1 to 9 without repetition.
            Each 3x3 subgrid (or region) must contain all numbers from 1 to 9 without repetition.
            Solving Strategy:
            Look for rows, columns, or regions with fewest missing numbers. These are typically easier to solve.
            Identify numbers that can only fit in one cell within a row, column, or region. This is often referred to as elimination.
            Use logical deduction and elimination to gradually fill in the grid. If you're stuck, try making educated guesses and continue from there.
            Trial and Error: Sometimes, you may need to try different numbers in a cell to see which one fits. If a number conflicts with the rules, backtrack and try a different number.
            Patience and Practice: Sudoku requires patience and practice. Start with easier puzzles and gradually move to more challenging ones as you become more comfortable with the rules and strategies.
            Remember, there's always a unique solution to every Sudoku puzzle, and no math or arithmetic is required. Enjoy the challenge of solving Sudoku puzzles!"
          />
          <GameCards
            imgUrl={Millionaire}
            gameUrl="who-wants-to-be-a-millionaire"
            gameTitle="Math Millionaire"
            helpMessage="Welcome to Math Millionaire!
            Objective: Answer a series of math questions correctly to progress through the game and win the million-dollar prize!
            Rules:
            - You will be presented with a series of multiple-choice math questions.
            - Select the correct answer from the options provided.
            - Answer as many questions as you can correctly to increase your winnings.
            - If you answer a question incorrectly, you may lose some or all of your winnings.
            - Use lifelines such as 50/50, Phone a Friend, and Ask the Audience to help you answer difficult questions.
            - Reach the final question and answer it correctly to become a millionaire!
            Get ready to test your math skills and win big!"
          />
          <GameCards
            imgUrl={Shapes}
            gameUrl="shape"
            gameTitle="Shape It"
            helpMessage={`
            Objective: Identify the shape shown on the screen correctly to earn points and progress through the game.\n
            Rules:\n
            - You will be presented with a shape displayed on the screen.\n
            - Choose the correct shape from the three options provided below/beside the image.\n
            - Select the option that matches the shape shown as accurately as possible.\n
            - Be careful! Choosing the wrong shape may result in a loss of points or progress.\n
            - Answer as many questions as you can correctly to achieve a high score.\n
            - Use your knowledge of shapes and geometrical properties to make accurate choices.\n
            Get ready to test your shape recognition skills and have fun playing the game!`}
          />
        </div>
      </div>
    </div>
  );
};

export default GamesPage;
