import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Game from "../components/Game";
import type { Player } from "../types";

describe("Game component (integration)", () => {
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

  it("renders status and 9 squares", () => {
    renderGame();
    expect(screen.getByText(/Now playing/i)).toBeInTheDocument();
    for (let i = 0; i < 9; i++) {
      expect(screen.getByTestId(`square-${i}`)).toBeInTheDocument();
    }
  });

  it("plays a move and updates player", () => {
    renderGame();

    const square0 = screen.getByTestId("square-0");
    fireEvent.click(square0);

    expect(square0).toHaveTextContent("X");
    expect(setCurrentPlayer).toHaveBeenCalledWith("O");
  });

  it("prevents square override", () => {
    renderGame();

    const square0 = screen.getByTestId("square-0");
    fireEvent.click(square0); // first move
    fireEvent.click(square0); // should not change
    expect(square0).toHaveTextContent("X");
    expect(setCurrentPlayer).toHaveBeenCalledTimes(1);
  });

  it("handles full winning sequence and stops moves", () => {
    renderGame();

    fireEvent.click(screen.getByTestId("square-0")); // X
    fireEvent.click(screen.getByTestId("square-3")); // O
    fireEvent.click(screen.getByTestId("square-1")); // X
    fireEvent.click(screen.getByTestId("square-4")); // O
    fireEvent.click(screen.getByTestId("square-2")); // X wins

    // Board shows winner
    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();

    // No further moves
    fireEvent.click(screen.getByTestId("square-5"));
    expect(setCurrentPlayer).toHaveBeenCalledTimes(3); // O, X, O only
  });

  it("renders and interacts with GameUI (toggle history)", () => {
    renderGame();
    fireEvent.click(screen.getByTestId("history-button")); // From GameUI
    expect(handleHistoryVisibility).toHaveBeenCalled();
  });

  it("renders History when historyVisible is true", () => {
    renderGame({ historyVisible: true });

    const undoButton = screen.getByRole("button", { name: /Undo button/i });
    expect(undoButton).toBeInTheDocument();
  });

  it("undo on first move returns to home screen", () => {
    renderGame({ historyVisible: true });

    const undoButton = screen.getByRole("button", { name: /Undo button/i });
    fireEvent.click(undoButton);

    expect(setHasStarted).toHaveBeenCalledWith(false);
  });

  it("can undo a move before game is over", () => {
    renderGame({ historyVisible: true });

    fireEvent.click(screen.getByTestId("square-0"));
    fireEvent.click(screen.getByTestId("square-1"));

    fireEvent.click(screen.getByRole("button", { name: /Undo button/i }));
    expect(setCurrentPlayer).toHaveBeenCalled();
  });
});
