type SquareProps = {
  index: number;
  value: string | null;
  onSquareClick: () => void;
  isWinning: boolean | undefined;
  isLast: string;
};

const Square: React.FC<SquareProps> = ({
  index,
  value,
  onSquareClick,
  isWinning,
  isLast,
}) => {
  return (
    <button
      data-testid={`square-${index}`}
      className={`${isLast} player${value} square container ${
        isWinning ? "winning" : ""
      }`}
      onClick={onSquareClick}
    >
      <span>{value}</span>
    </button>
  );
};

export default Square;
