import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, History } from "lucide-react";

type GameUIProps = {
  currentMove: number;

  handleHistoryVisibility: () => void;
};

const GameUI: React.FC<GameUIProps> = ({
  currentMove,

  handleHistoryVisibility,
}) => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="col container">
      <button className="button icon" onClick={toggleTheme}>
        {theme === "light" ? <Moon /> : <Sun />}
      </button>
      {currentMove !== 0 && (
        <button className="button icon" onClick={handleHistoryVisibility}>
          <History />
        </button>
      )}
    </div>
  );
};
export default GameUI;
