import React, { useState, useEffect } from "react";
import { Player, HistoryStep } from "../types";
import { calculateWinner, WinnerResult } from "./utils";
import Board from "./Board";
import GameUI from "./GameUI";
import Status from "./Status";
import History from "./History";

type GameProps = {
  currentPlayer: Player;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<Player>>;
  setHasStarted: React.Dispatch<React.SetStateAction<boolean>>;
  historyVisible: boolean;
  setHistoryVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleHistoryVisibility: () => void;
};

const Game: React.FC<GameProps> = ({
  currentPlayer,
  setCurrentPlayer,
  setHasStarted,
  historyVisible,
  setHistoryVisible,
  handleHistoryVisibility,
}) => {
  const [currentMove, setCurrentMove] = useState<number>(0);
  const [history, setHistory] = useState<HistoryStep[]>([
    { squares: Array(9).fill(null), currentPosition: null, player: null },
  ]);

  // Get the current board state
  const currentSquares = history[currentMove].squares;

  // Calculate winner or draw
  const result: WinnerResult | null = calculateWinner(currentSquares);
  const winningLine = result?.line;

  useEffect(() => {
    // Only set historyVisible to false if we're on the first move
    if (currentMove === 0) {
      setHistoryVisible(false);
    }
  }, [currentMove, setHistoryVisible]); // Re-run this effect when `currentMove` changes

  // Handle a move (play action)
  const handlePlay = (
    nextSquares: Player[], // Updated to Player[]
    currentPosition: [number, number]
  ) => {
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      {
        squares: nextSquares,
        currentPosition,
        player: currentPlayer, // Type assertion here
      },
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    if (!result?.winner) {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // Switch the player
    }
  };

  // Undo the last move or restart the game
  const handleUndo = () => {
    if (result || currentMove === 0) {
      restartGame();
      return;
    }

    if (currentMove > 0) {
      setHistory(history.slice(0, -1));
      setCurrentMove(currentMove - 1);
      setCurrentPlayer(currentPlayer == "X" ? "O" : "X"); // Switch the player
    }
  };

  // Restart the game
  const restartGame = () => {
    setHistory([
      { squares: Array(9).fill(null), currentPosition: null, player: null },
    ]);
    setCurrentMove(0);
    setHasStarted(false); // Reset the game state
  };

  return (
    <div className="main container">
      <h1 className="main-title">Tic-Tac-Toe</h1>
      <div className="game container">
        <Status result={result} currentPlayer={currentPlayer} />
        <div className="board-sec container col">
          <Board
            currentPlayer={currentPlayer}
            squares={currentSquares}
            handlePlay={handlePlay}
            winningLine={winningLine}
          />
          {historyVisible && (
            <History history={history} onUndoClick={handleUndo} />
          )}
        </div>
        <GameUI
          currentMove={currentMove}
          handleHistoryVisibility={handleHistoryVisibility}
        />
      </div>
    </div>
  );
};

export default Game;
