import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeContext";
import GameUI from "../components/GameUI";

describe("GameUI integration with ThemeProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders Moon icon (light theme) and switches to Sun (dark theme)", () => {
    render(
      <ThemeProvider>
        <GameUI currentMove={0} handleHistoryVisibility={vi.fn()} />
      </ThemeProvider>
    );

    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));

    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
