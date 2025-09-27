import { Undo } from "lucide-react";

type HistoryProps = {
  history: any[];
  onUndoClick: () => void;
};

const History: React.FC<HistoryProps> = ({ history, onUndoClick }) => {
  const moves = history.map((step, move) => {
    const { currentPosition, player } = step;
    const playerClass = player === "X" ? "playerX" : "playerO";
    if (move > 0) {
      return (
        <li key={move}>
          <span className={playerClass}>{move}</span>
          <span> Player </span>
          <span className={playerClass}>{player}</span>
          <span>{` at row ${currentPosition?.[0]}, col ${currentPosition?.[1]}`}</span>
        </li>
      );
    }
    return null;
  });

  return (
    <div className="game-info container">
      <div className="container col">
        <h2 className="main-title">History</h2>
        <button onClick={onUndoClick} className="button icon">
          <Undo />
        </button>
      </div>
      <ul className="container">{moves}</ul>
    </div>
  );
};

export default History;
