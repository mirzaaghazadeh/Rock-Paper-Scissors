import { Choice, GameResult } from '../types';

export const getRandomChoice = (): Choice => {
  const choices: Choice[] = ['rock', 'paper', 'scissors'];
  // Use crypto.getRandomValues for true randomness
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return choices[array[0] % 3];
};

export const determineWinner = (playerChoice: Choice, computerChoice: Choice): GameResult => {
  if (playerChoice === computerChoice) return 'draw';

  const winConditions = {
    rock: 'scissors',
    paper: 'rock',
    scissors: 'paper',
  };

  return winConditions[playerChoice] === computerChoice ? 'win' : 'lose';
};