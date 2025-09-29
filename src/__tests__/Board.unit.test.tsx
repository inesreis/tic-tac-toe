import { render, screen, fireEvent } from "@testing-library/react";
import Board from "../components/Board";
import { vi } from "vitest";
import { Player } from "../types";

describe("Board component", () => {
  const emptySquares: Player[] = Array(9).fill(null);

  it("renders 9 squares", () => {
    const mockPlay = vi.fn();
    render(
      <Board
        currentPlayer="X"
        squares={emptySquares}
        handlePlay={mockPlay}
        winningLine={undefined}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(9);
  });

  it("calls handlePlay when a square is clicked", () => {
    const mockPlay = vi.fn();
    render(
      <Board
        currentPlayer="X"
        squares={emptySquares}
        handlePlay={mockPlay}
        winningLine={undefined}
      />
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(mockPlay).toHaveBeenCalledOnce();
    expect(mockPlay).toHaveBeenCalledWith(
      expect.any(Array), // the updated squares array
      [1, 1] // row + col for the clicked square (index 0)
    );
  });

  it("does NOT call handlePlay if square is already filled", () => {
    const filledSquares: Player[] = [...emptySquares];
    filledSquares[0] = "X";

    const mockPlay = vi.fn();
    render(
      <Board
        currentPlayer="O"
        squares={filledSquares}
        handlePlay={mockPlay}
        winningLine={undefined}
      />
    );

    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(mockPlay).not.toHaveBeenCalled();
  });

  it('adds "winning" class to squares in the winning line', () => {
    const squaresWithWin: Player[] = [
      "X",
      "X",
      "X",
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    const mockPlay = vi.fn();

    render(
      <Board
        currentPlayer="O"
        squares={squaresWithWin}
        handlePlay={mockPlay}
        winningLine={[0, 1, 2]}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons[0].className).toContain("winning");
    expect(buttons[1].className).toContain("winning");
    expect(buttons[2].className).toContain("winning");
  });
});
