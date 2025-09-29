import { useState } from "react";
import { Player } from "./types";
import Header from "./components/Header";
import Game from "./components/Game";
import Homescreen from "./components/Homescreen";

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

  return (
    <div className="main container">
      <Header />
      {!hasStarted ? (
        <Homescreen
          startGame={startGame}
          handleHistoryVisibility={handleHistoryVisibility}
        />
      ) : (
        <Game
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          setHasStarted={setHasStarted}
          historyVisible={historyVisible}
          setHistoryVisible={setHistoryVisible}
          handleHistoryVisibility={handleHistoryVisibility}
        />
      )}
    </div>
  );
}

export default App;
