import GameUI from "./GameUI";
import { Player } from "../types";

type HomescreenProps = {
  startGame: (player: Player) => void;
  handleHistoryVisibility: () => void;
};

const Homescreen: React.FC<HomescreenProps> = ({
  startGame,
  handleHistoryVisibility,
}) => {
  const handlePlayerSelection = (player: Player) => {
    startGame(player);
  };
  return (
    <div className="start container">
      <h2>Choose a Player to Start </h2>
      <div className="container col">
        <button className="playerX" onClick={() => handlePlayerSelection("X")}>
          X
        </button>
        <button className="playerO" onClick={() => handlePlayerSelection("O")}>
          O
        </button>
      </div>
      <GameUI
        currentMove={0}
        handleHistoryVisibility={handleHistoryVisibility}
      />
    </div>
  );
};
export default Homescreen;
