import { render, screen, fireEvent } from "@testing-library/react";
import Square from "../components/Square";
import { vi } from "vitest";

describe("Square component", () => {
  it("renders with value X", () => {
    render(
      <Square
        index={0}
        value="X"
        onSquareClick={() => {}}
        isWinning={false}
        isLast=""
      />
    );
    expect(screen.getByRole("button")).toHaveTextContent("X");
    expect(screen.getByRole("button").className).toContain("playerX");
  });

  it("calls onSquareClick when clicked", () => {
    const handleClick = vi.fn();
    render(
      <Square
        index={0}
        value={null}
        onSquareClick={handleClick}
        isWinning={false}
        isLast=""
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies winning class if isWinning is true", () => {
    render(
      <Square
        index={0}
        value="O"
        onSquareClick={() => {}}
        isWinning={true}
        isLast=""
      />
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("winning");
  });

  it("applies isLast class", () => {
    render(
      <Square
        index={0}
        value="O"
        onSquareClick={() => {}}
        isWinning={false}
        isLast="last-move"
      />
    );
    const button = screen.getByRole("button");
    expect(button.className).toContain("last-move");
  });
});
