import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import type { Player } from "../types";

vi.mock("../components/Status", () => ({
  __esModule: true,
  default: ({ currentPlayer }: { currentPlayer: "X" | "O" }) => (
    <div data-testid="status">Status - {currentPlayer}</div>
  ),
}));

// History mock
vi.mock("../components/History", () => ({
  __esModule: true,
  default: ({ onUndoClick }: { onUndoClick: () => void }) => (
    <button data-testid="undo" onClick={onUndoClick}>
      Undo
    </button>
  ),
}));

// GameUI mock
vi.mock("../components/GameUI", () => ({
  __esModule: true,
  default: ({
    handleHistoryVisibility,
  }: {
    handleHistoryVisibility: () => void;
  }) => (
    <button data-testid="hostory-button" onClick={handleHistoryVisibility}>
      Toggle History
    </button>
  ),
}));

import Game from "../components/Game";

describe("Game component (unit)", () => {
  let currentPlayer: Player;
  let setCurrentPlayer: () => {};
  let setHasStarted: () => {};
  let historyVisible: boolean;
  let setHistoryVisible: () => {};
  let handleHistoryVisibility: () => {};

  beforeEach(() => {
    currentPlayer = "X";
    setCurrentPlayer = vi.fn();
    setHasStarted = vi.fn();
    historyVisible = false;
    setHistoryVisible = vi.fn();
    handleHistoryVisibility = vi.fn();
  });

  const renderGame = (props = {}) =>
    render(
      <Game
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        setHasStarted={setHasStarted}
        historyVisible={historyVisible}
        setHistoryVisible={setHistoryVisible}
        handleHistoryVisibility={handleHistoryVisibility}
        {...props}
      />
    );

  it("renders status and first square", () => {
    renderGame();
    expect(screen.getByTestId("square-0")).toBeInTheDocument();
  });

  it("calls setCurrentPlayer on square click", () => {
    renderGame();
    fireEvent.click(screen.getByTestId("square-0"));
    expect(setCurrentPlayer).toHaveBeenCalledWith("O");
  });

  it("does not overwrite an already filled square", () => {
    renderGame();
    const square = screen.getByTestId("square-0");
    fireEvent.click(square); // First move
    fireEvent.click(square); // Should be ignored
    expect(setCurrentPlayer).toHaveBeenCalledTimes(1);
  });

  it("calls setHasStarted(false) on undo at first move", () => {
    renderGame({ historyVisible: true });
    fireEvent.click(screen.getByTestId("undo"));
    expect(setHasStarted).toHaveBeenCalledWith(false);
  });

  it("renders undo button only when historyVisible is true", () => {
    const { rerender } = renderGame({ historyVisible: false });
    expect(screen.queryByTestId("undo")).not.toBeInTheDocument();

    rerender(
      <Game
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        setHasStarted={setHasStarted}
        historyVisible={true}
        setHistoryVisible={setHistoryVisible}
        handleHistoryVisibility={handleHistoryVisibility}
      />
    );

    expect(screen.getByTestId("undo")).toBeInTheDocument();
  });

  it("calls setHistoryVisible(false) on first move via useEffect", () => {
    renderGame({ historyVisible: true });
    expect(setHistoryVisible).toHaveBeenCalledWith(false);
  });

  it("calls handleHistoryVisibility when GameUI button is clicked", () => {
    renderGame();
    fireEvent.click(screen.getByTestId("hostory-button"));
    expect(handleHistoryVisibility).toHaveBeenCalled();
  });

  it("stops interaction after winning move", () => {
    renderGame();
    // Simulate win: X, O, X, O, X
    fireEvent.click(screen.getByTestId("square-0")); // X
    fireEvent.click(screen.getByTestId("square-3")); // O
    fireEvent.click(screen.getByTestId("square-1")); // X
    fireEvent.click(screen.getByTestId("square-4")); // O
    fireEvent.click(screen.getByTestId("square-2")); // X wins

    // Attempt more moves after win
    fireEvent.click(screen.getByTestId("square-5"));
    expect(setCurrentPlayer).toHaveBeenCalledTimes(5);
  });
});
