export type WinnerResult =
  | { winner: "X" | "O"; line: number[] }
  | { winner: null; draw: true; line?: never };

export const calculateWinner = (
  squares: (string | null)[]
): WinnerResult | null => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] as "X" | "O", line };
    }
  }

  const isDraw = squares.every((square) => square !== null);
  if (isDraw) return { winner: null, draw: true }; // Ensure draw is true

  return null; // Return null when no winner and no draw
};
