export type Choice = 'rock' | 'paper' | 'scissors';
export type GameResult = 'win' | 'lose' | 'draw' | null;

export interface GameSettings {
  playerName: string;
  rounds: number;
}

export interface GameState {
  currentRound: number;
  isGameOver: boolean;
  playerScore: number;
  computerScore: number;
}