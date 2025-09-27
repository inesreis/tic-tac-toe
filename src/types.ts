export type Player = "X" | "O" | null;

export type HistoryStep = {
  squares: Player[];
  currentPosition: [number, number] | null;
  player: Player;
};
