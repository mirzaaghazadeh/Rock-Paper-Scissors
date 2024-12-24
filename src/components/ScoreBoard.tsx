import { motion } from 'framer-motion';

interface ScoreBoardProps {
  score: number;
}

export const ScoreBoard = ({ score }: ScoreBoardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-4 mb-8"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800">Score: {score}</h2>
    </motion.div>
  );
};