import React from "react";

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
  isWinning: boolean | undefined;
  isLast: string;
};

const Square: React.FC<SquareProps> = ({
  value,
  onSquareClick,
  isWinning,
  isLast,
}) => {
  return (
    <button
      className={`${isLast} ${
        value === "X" ? "playerX" : "playerO"
      } square container ${isWinning ? "winning" : ""}`}
      onClick={onSquareClick}
    >
      <span>{value}</span>
    </button>
  );
};

export default Square;
