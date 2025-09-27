import { useState } from "react";
import Game from "./components/Game";
import Homescreen from "./components/HomeScreen";
import { Player } from "./types";

function App() {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [historyVisible, setHistoryVisible] = useState<boolean>(false);

  const startGame = (player: Player) => {
    setHasStarted(true);
    setCurrentPlayer(player);
    setHistoryVisible(false);
  };
  const handleHistoryVisibility = () => {
    setHistoryVisible((prev) => !prev);
  };

  if (!hasStarted) {
    return (
      <Homescreen
        startGame={startGame}
        handleHistoryVisibility={handleHistoryVisibility}
      />
    );
  }

  return (
    <Game
      currentPlayer={currentPlayer}
      setCurrentPlayer={setCurrentPlayer}
      setHasStarted={setHasStarted}
      historyVisible={historyVisible}
      setHistoryVisible={setHistoryVisible}
      handleHistoryVisibility={handleHistoryVisibility}
    />
  );
}

export default App;
