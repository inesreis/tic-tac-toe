import ThemeToggle from "./ThemeToggle";
import { History } from "lucide-react";

type GameUIProps = {
  currentMove: number;
  handleHistoryVisibility: () => void;
};

const GameUI: React.FC<GameUIProps> = ({
  currentMove,
  handleHistoryVisibility,
}) => {
  return (
    <div className="col container ui">
      <ThemeToggle />

      {currentMove !== 0 && (
        <button
          aria-label="Show history"
          data-testid="history-button"
          className="button icon"
          onClick={handleHistoryVisibility}
        >
          <History data-testid="history-icon" />
        </button>
      )}
    </div>
  );
};

export default GameUI;
