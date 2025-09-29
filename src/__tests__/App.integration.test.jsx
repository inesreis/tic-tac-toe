import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../App";

describe("App (integration)", () => {
  it("Renders Header and Homescreen on initial load", () => {
    render(<App />);

    //Render Header
    expect(screen.getByText(/Tic-Tac-Toe/i)).toBeInTheDocument();
    //Render Homescreen
    expect(screen.getByText(/Choose a Player to Start/i)).toBeInTheDocument();
  });

  it("Starts Game after player selection", () => {
    render(<App />);

    //Select player
    const startButtonX = screen.getByRole("button", { name: /X/i });
    fireEvent.click(startButtonX);

    //Render Game
    expect(screen.getByText("Now playing")).toBeInTheDocument();
    expect(screen.getByTestId("board")).toBeInTheDocument();

    //Display selected Player
    expect(screen.getByText("X")).toBeInTheDocument();
  });

  it("Plays a move and updates current player", () => {
    render(<App />);

    //Select player
    fireEvent.click(screen.getByRole("button", { name: /X/i }));

    //Click first Square
    const firstSquare = screen.getByTestId("square-0");
    fireEvent.click(firstSquare);

    //Square displays selected Player
    expect(firstSquare).toHaveTextContent("X");

    //Status displays next Player
    expect(screen.getByTestId("current-player")).toHaveTextContent("O");
  });

  it("Restarts game when Undo is clicked at game end", () => {
    render(<App />);

    //Select player
    fireEvent.click(screen.getByRole("button", { name: /X/i }));

    //Winning Game
    fireEvent.click(screen.getByTestId("square-0"));
    fireEvent.click(screen.getByTestId("square-3"));
    fireEvent.click(screen.getByTestId("square-1"));
    fireEvent.click(screen.getByTestId("square-4"));
    fireEvent.click(screen.getByTestId("square-2"));

    //Open History
    const toggleHistory = screen.getByTestId("history-button");
    fireEvent.click(toggleHistory);

    //Click Undo button
    const undoButton = screen.getByRole("button", { name: /Undo button/i });
    fireEvent.click(undoButton);

    //Render Homescreen
    expect(screen.getByText(/Choose a Player to Start/i)).toBeInTheDocument();
  });
});
