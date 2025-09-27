import { WinnerResult } from "../components/utils";
import { Player } from "../types";
type StatusProps = {
  result: WinnerResult | null;
  currentPlayer: Player;
};

const Status: React.FC<StatusProps> = ({ result, currentPlayer }) => {
  const status = result?.winner
    ? "Winner"
    : result?.draw
    ? "It's a draw!"
    : "Now playing";

  return (
    <div className="status container col">
      <h2 className={result?.winner ? "button" : ""}>{status}</h2>
      <span
        className={
          result?.winner === "X" || currentPlayer === "X"
            ? "playerX"
            : "playerO"
        }
      >
        {result?.winner ? result.winner : currentPlayer}
      </span>
    </div>
  );
};
export default Status;
