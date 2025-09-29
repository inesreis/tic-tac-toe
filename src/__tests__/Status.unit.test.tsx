import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Status from "../components/Status";

describe("Status component", () => {
  it('displays "Now playing" with current player', () => {
    render(<Status result={null} currentPlayer="X" />);

    expect(screen.getByRole("heading")).toHaveTextContent("Now playing");
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("X")).toHaveClass("playerX");
  });

  it('displays "Winner" and winning player', () => {
    const result = {
      winner: "O" as const,
      line: [0, 1, 2],
    };

    render(<Status result={result} currentPlayer="X" />);

    expect(screen.getByRole("heading")).toHaveTextContent("Winner");
    expect(screen.getByText("O")).toBeInTheDocument();
    expect(screen.getByText("O")).toHaveClass("playerO");
    expect(screen.getByRole("heading")).toHaveClass("button");
  });

  it('displays "It\'s a draw!" when draw is true', () => {
    const result = {
      winner: null,
      draw: true as const,
    };

    render(<Status result={result} currentPlayer="O" />);

    expect(screen.getByRole("heading")).toHaveTextContent("It's a draw!");
    expect(screen.getByText("O")).toBeInTheDocument(); // still show current player
    expect(screen.getByText("O")).toHaveClass("playerO");
  });
});
