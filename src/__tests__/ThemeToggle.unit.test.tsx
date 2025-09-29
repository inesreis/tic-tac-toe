import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "../context/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import userEvent from "@testing-library/user-event";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("light mode - shows Moon icon", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("sun-icon")).not.toBeInTheDocument();
  });

  it("light mode - toggles to dark theme and shows Sun icon", () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole("button", { name: /toggle theme/i });
    fireEvent.click(toggleBtn);

    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("respects localStorage on load", () => {
    localStorage.setItem("theme", "dark");

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  it("toggles theme using Enter key", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole("button", { name: /toggle theme/i });

    // Initially light (Moon icon)
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();

    // Press Enter
    toggleBtn.focus();

    await userEvent.keyboard("{Enter}");

    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  it("toggles theme using Space key", async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggleBtn = screen.getByRole("button", { name: /toggle theme/i });

    // Initially light
    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();

    // Press Space

    toggleBtn.focus();
    await userEvent.keyboard("{ }");

    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });
});
