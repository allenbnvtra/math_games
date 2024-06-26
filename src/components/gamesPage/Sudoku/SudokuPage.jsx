"use client";

import React, { useEffect, useState } from "react";
import "./Sudoku.css";
import { TiArrowBackOutline } from "react-icons/ti";

import {
  Grid,
  ChoiceBoard,
  Button,
  InformationModal,
  NoSolutionFoundModal,
  GameDetails,
  DifficultySelectionModal,
} from "../../../components/sudokuComponents/index.js";
import {
  animateElement,
  arrayDeepCopy,
  checkBoard,
  checkPlayerWon,
  createSudokuGrid,
  solveSudoku,
} from "../../../utility/index.js";
import getHint from "../../../utility/getHint";
import Link from "next/link";
import axios from "axios";

const easyMaxEmptyCells = 30;
const mediumMaxEmptyCells = 40;
const hardMaxEmptyCells = 50;

const SudokuPage = () => {
  const [grid, setGrid] = useState(null);
  const [startingGrid, setStartingGrid] = useState(null);
  const [clickValue, setClickValue] = useState(1);
  const [gameMode, setGameMode] = useState(mediumMaxEmptyCells);
  const [movesTaken, setMovesTaken] = useState(0);
  const [hintsTaken, setHintsTaken] = useState(0);
  const [isPlayerWon, setIsPlayerWon] = useState(false);
  const [pressedSolve, setPressedSolve] = useState(false);
  const [startTime, setStartTime] = useState(() => new Date().toLocaleString());
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [showNoSolutionFoundModal, setShowNoSolutionFoundModal] =
    useState(false);
  const [showGameDetails, setShowGameDetails] = useState(false);
  const [showDifficultySelectionModal, setShowDifficultySelectionModal] =
    useState(false);

  useEffect(() => {
    if (isPlayerWon) {
      sendScoreToServer(20);
    }
  }, [isPlayerWon]);

  const sendScoreToServer = async (score) => {
    try {
      await axios.post("/api/score", { score });
    } catch (error) {
      console.error("Error sending score:", error);
    }
  };

  const handleSolve = () => {
    let solvedBoard = arrayDeepCopy(grid);
    let solvedStatus = solveSudoku(solvedBoard);
    if (solvedStatus === false) {
      setShowNoSolutionFoundModal((show) => !show);
      return;
    }

    let newHints = 0;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (grid[i][j].value === 0) {
          newHints++;
          solvedBoard[i][j].isHinted = true;
          solvedBoard[i][j].isModifiable = false;
        }
      }
    }

    setHintsTaken((hints) => hints + newHints);
    setIsPlayerWon(true);
    setShowGameDetails(true);
    setPressedSolve(true);
    setGrid(solvedBoard);
  };

  const handleHint = () => {
    // Checking if player has won
    if (isPlayerWon) return;

    // Getting hint
    let hintResponse = getHint(grid);

    // Checking if the grid cannot be solved
    if (hintResponse.solvedStatus === false) {
      setShowNoSolutionFoundModal((show) => !show);
      return;
    }

    // setting the result board
    setGrid(hintResponse.board);

    // Adding hint count
    setHintsTaken((hints) => hints + 1);

    // Checking if the player has won
    let playerWon = checkPlayerWon(hintResponse.board);
    if (playerWon) {
      setIsPlayerWon(true);
      setShowGameDetails(true);
    }
  };

  const handleNewGame = (maxEmptyCellsCount) => {
    // Waiting for the function to return the grid
    let newSudokuGrid = createSudokuGrid(maxEmptyCellsCount);

    setStartingGrid(arrayDeepCopy(newSudokuGrid));
    setGrid(arrayDeepCopy(newSudokuGrid));

    // Setting the game mode with maxEmptyCellsCount
    setGameMode(maxEmptyCellsCount);

    // Reseting the values
    setMovesTaken(0);
    setHintsTaken(0);
    setIsPlayerWon(false);
    setPressedSolve(false);
    setStartTime(() => new Date().toLocaleString());

    // Closing the difficulty modal and also setting the isLoading to false
    setShowDifficultySelectionModal((show) => !show);
  };

  const handleClearBoard = () => {
    setIsPlayerWon(false);
    setGrid(arrayDeepCopy(startingGrid));
  };

  const handleCellClick = (row, column, isModifiable) => {
    if (!isModifiable) {
      animateElement(".grid-table", "headShake");
      return;
    }

    // moves registered when the value is not 0
    if (clickValue !== 0) setMovesTaken((moves) => moves + 1);

    let newGrid = arrayDeepCopy(grid);
    newGrid[row][column].value = clickValue;

    // Marking the node valid or invalid depending on the grid
    checkBoard(newGrid);

    // Checking if the player has won
    let playerWon = checkPlayerWon(newGrid);
    if (playerWon) {
      setIsPlayerWon(true);
      setShowGameDetails(true);
    }

    // setting the value to the grid and also to the local storage
    setGrid(newGrid);
  };

  // If we donot have anything in the local storage
  if (grid == null && startingGrid == null) handleNewGame(gameMode);

  return (
    <div className="Game">
      <div className="pt-5 pl-36 w-full flex text-5xl cursor-pointer">
        <Link href="/games">
          <TiArrowBackOutline />
        </Link>
      </div>

      <h1
        onClick={() => setShowInformationModal((show) => !show)}
        className="main-title"
      >
        Sudoku Game
      </h1>
      {showInformationModal && (
        <InformationModal
          closeModal={() => setShowInformationModal((show) => !show)}
        />
      )}

      {showNoSolutionFoundModal && (
        <NoSolutionFoundModal
          closeModal={() => setShowNoSolutionFoundModal((show) => !show)}
        />
      )}

      {showDifficultySelectionModal && (
        <DifficultySelectionModal
          closeModal={() => setShowDifficultySelectionModal((show) => !show)}
          handleNewGame={handleNewGame}
          easyMaxEmptyCells={easyMaxEmptyCells}
          mediumMaxEmptyCells={mediumMaxEmptyCells}
          hardMaxEmptyCells={hardMaxEmptyCells}
        />
      )}

      {showGameDetails && (
        <GameDetails
          closeModal={() => setShowGameDetails((show) => !show)}
          movesTaken={movesTaken}
          hintsTaken={hintsTaken}
          startTime={startTime}
          isPlayerWon={isPlayerWon}
          pressedSolve={pressedSolve}
          gameMode={gameMode}
          mediumMaxEmptyCells={mediumMaxEmptyCells}
          hardMaxEmptyCells={hardMaxEmptyCells}
        />
      )}
      <Grid handleCellClick={handleCellClick} grid={grid} />
      <ChoiceBoard setClickValue={setClickValue} selected={clickValue} />
      <div className="action-container">
        <Button
          onClick={handleClearBoard}
          buttonStyle="btn--primary--solid"
          text="Reset"
        />
        {/* <Button
          onClick={handleSolve}
          buttonStyle="btn--success--solid"
          text="Solve"
        /> */}
        {/* <Button
          onClick={handleHint}
          buttonStyle="btn--warning--solid"
          text="Hint"
        /> */}
        <Button
          onClick={() => setShowDifficultySelectionModal((show) => !show)}
          buttonStyle="btn--danger--solid"
          text="New Game"
        />
        <video className="background-video" autoPlay loop muted>
          <source src="/sudoku.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default SudokuPage;
