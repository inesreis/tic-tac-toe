import { calculateWinner } from "../../components/utils";

describe("calculateWinner", () => {
  it("detects a winner in a row", () => {
    const squares = ["X", "X", "X", null, null, null, null, null, null];
    expect(calculateWinner(squares)).toEqual({
      winner: "X",
      line: [0, 1, 2],
    });
  });

  it("detects a winner in a column", () => {
    const squares = ["O", null, null, "O", null, null, "O", null, null];
    expect(calculateWinner(squares)).toEqual({
      winner: "O",
      line: [0, 3, 6],
    });
  });

  it("detects a winner in a diagonal", () => {
    const squares = ["X", null, null, null, "X", null, null, null, "X"];
    expect(calculateWinner(squares)).toEqual({
      winner: "X",
      line: [0, 4, 8],
    });
  });

  it("returns draw result if board is full and no winner", () => {
    const squares = ["X", "O", "X", "O", "X", "O", "O", "X", "O"];
    expect(calculateWinner(squares)).toEqual({
      winner: null,
      draw: true,
    });
  });

  it("returns null if no winner and board not full", () => {
    const squares = ["X", "O", "X", "O", null, "O", "O", "X", null];
    expect(calculateWinner(squares)).toBeNull();
  });
});
