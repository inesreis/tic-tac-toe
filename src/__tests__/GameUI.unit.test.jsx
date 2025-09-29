import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import GameUI from "../../../components/GameUI";
import { ThemeContext } from "../../../context/ThemeContext";

const renderWithTheme = (
  ui,
  { theme = "light", toggleTheme = vi.fn() } = {}
) => {
  const mockValue = { theme, toggleTheme };

  const Wrapper = ({ children }) => (
    <ThemeContext.Provider value={mockValue}>{children}</ThemeContext.Provider>
  );

  return render(ui, { wrapper: Wrapper });
};

describe("GameUI ThemeToggle Button", () => {
  it("light mode - renders theme toggle button with Moon icon", () => {
    renderWithTheme(
      <GameUI currentMove={0} handleHistoryVisibility={vi.fn()} />,
      { theme: "light" }
    );

    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
  });

  it("dark mode - renders theme toggle button with Sun icon", () => {
    renderWithTheme(
      <GameUI currentMove={0} handleHistoryVisibility={vi.fn()} />,
      { theme: "dark" }
    );

    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  it("calls toggleTheme on theme button click", () => {
    const toggleTheme = vi.fn();

    renderWithTheme(
      <GameUI currentMove={0} handleHistoryVisibility={vi.fn()} />,
      { theme: "light", toggleTheme }
    );

    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

    expect(toggleTheme).toHaveBeenCalledOnce();
  });
});

describe("GameUI History Button", () => {
  it("renders history button only when currentMove !== 0", () => {
    const { rerender } = renderWithTheme(
      <GameUI currentMove={0} handleHistoryVisibility={vi.fn()} />
    );
    expect(screen.queryByTestId("history-button")).not.toBeInTheDocument();

    rerender(<GameUI currentMove={1} handleHistoryVisibility={vi.fn()} />);
    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  it("calls handleHistoryVisibility on history button click", () => {
    const mockHandleHistory = vi.fn();

    renderWithTheme(
      <GameUI currentMove={1} handleHistoryVisibility={mockHandleHistory} />
    );

    fireEvent.click(screen.getByTestId("history-button"));

    expect(mockHandleHistory).toHaveBeenCalledOnce();
  });
});
