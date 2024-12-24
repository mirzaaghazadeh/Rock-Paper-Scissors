import { motion } from 'framer-motion';
import { GameResult } from '../types';

interface ResultProps {
  result: GameResult;
}

export const Result = ({ result }: ResultProps) => {
  if (!result) return null;

  const resultMessages = {
    win: '🎉 You Win!',
    lose: '😔 You Lose',
    draw: '🤝 Draw',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`text-4xl font-bold text-center mb-8 ${
        result === 'win' ? 'text-green-500' :
        result === 'lose' ? 'text-red-500' :
        'text-yellow-500'
      }`}
    >
      {resultMessages[result]}
    </motion.div>
  );
};