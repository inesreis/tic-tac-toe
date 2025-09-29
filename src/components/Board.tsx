import React from "react";
import Square from "./Square";
import { calculateWinner } from "./utils";
import { Player } from "../types";

type BoardProps = {
  currentPlayer: Player;
  squares: Player[];
  handlePlay: (
    nextSquares: Player[],
    currentPosition: [number, number]
  ) => void;
  winningLine: number[] | undefined;
};

const Board: React.FC<BoardProps> = ({
  currentPlayer,
  squares,
  handlePlay,
  winningLine,
}) => {
  const handleClick = React.useCallback(
    (i: number, currentPosition: [number, number]) => {
      const result = calculateWinner(squares);
      if (result || squares[i]) return;
      const nextSquares = squares.slice();
      nextSquares[i] = currentPlayer;
      handlePlay(nextSquares, currentPosition);
    },
    [squares, currentPlayer, handlePlay]
  );

  return (
    <div className="board container" data-testid="board">
      {[0, 1, 2].map((row) => (
        <div
          className={`board-row container col ${row === 2 ? "last-row" : ""}`}
          key={row}
        >
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            const isWinning = winningLine?.includes(index);
            return (
              <Square
                key={index}
                index={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index, [row + 1, col + 1])}
                isWinning={isWinning}
                isLast={col === 2 ? "last-col" : ""}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
