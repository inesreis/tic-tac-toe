import { render, screen, fireEvent } from "@testing-library/react";
import History from "../components/History";

describe("History component", () => {
  const mockOnUndoClick = vi.fn();

  const historyMock = [
    { currentPosition: null, player: null },
    { currentPosition: [0, 0], player: "X" },
    { currentPosition: [1, 2], player: "O" },
  ];

  beforeEach(() => {
    mockOnUndoClick.mockClear();
  });

  it("renders history moves excluding the first move", () => {
    render(<History history={historyMock} onUndoClick={mockOnUndoClick} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);

    expect(items[0]).toHaveTextContent("1 Player X at row 0, col 0");
    expect(items[1]).toHaveTextContent("2 Player O at row 1, col 2");
  });

  it("renders Undo button with the Undo icon", () => {
    render(<History history={historyMock} onUndoClick={mockOnUndoClick} />);
    const button = screen.getByRole("button", { name: /undo button/i });

    expect(button).toBeInTheDocument();
    expect(button.querySelector("svg")).toBeInTheDocument();
  });

  it("calls onUndoClick when Undo button is clicked", () => {
    render(<History history={historyMock} onUndoClick={mockOnUndoClick} />);

    const button = screen.getByRole("button", { name: /undo button/i });

    fireEvent.click(button);
    expect(mockOnUndoClick).toHaveBeenCalledOnce();
  });
});
