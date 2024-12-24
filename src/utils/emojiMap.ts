import { Choice } from '../types';

const emojiMap: Record<Choice, string> = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️'
};

export const getEmojiForChoice = (choice: Choice): string => {
  return emojiMap[choice];
};