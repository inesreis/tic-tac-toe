import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("../components/GameUI", () => {
  return {
    __esModule: true,
    default: vi.fn(() => <div data-testid="mock-game-ui" />),
  };
});

import Homescreen from "../components/Homescreen";
import GameUI from "../components/GameUI"; // This is now the mocked function

describe("Homescreen component", () => {
  const mockStartGame = vi.fn();
  const mockHandleHistoryVisibility = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders player selection buttons with corresponding className", () => {
    render(
      <Homescreen
        startGame={mockStartGame}
        handleHistoryVisibility={mockHandleHistoryVisibility}
      />
    );

    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("X")).toHaveClass("playerX");

    expect(screen.getByText("O")).toBeInTheDocument();
    expect(screen.getByText("O")).toHaveClass("playerO");
  });

  it("calls startGame with 'X' when X button is clicked", () => {
    render(
      <Homescreen
        startGame={mockStartGame}
        handleHistoryVisibility={mockHandleHistoryVisibility}
      />
    );

    fireEvent.click(screen.getByText("X"));
    expect(mockStartGame).toHaveBeenCalledWith("X");
  });

  it("calls startGame with 'O' when O button is clicked", () => {
    render(
      <Homescreen
        startGame={mockStartGame}
        handleHistoryVisibility={mockHandleHistoryVisibility}
      />
    );

    fireEvent.click(screen.getByText("O"));
    expect(mockStartGame).toHaveBeenCalledWith("O");
  });

  it("renders GameUI with correct props", () => {
    render(
      <Homescreen
        startGame={mockStartGame}
        handleHistoryVisibility={mockHandleHistoryVisibility}
      />
    );

    expect(GameUI).toHaveBeenCalledWith(
      expect.objectContaining({
        currentMove: 0,
        handleHistoryVisibility: mockHandleHistoryVisibility,
      }),
      undefined
    );

    expect(screen.getByTestId("mock-game-ui")).toBeInTheDocument();
  });
});
