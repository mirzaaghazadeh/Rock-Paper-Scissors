import { motion } from 'framer-motion';
import { GameState } from '../types';

interface GameInfoProps {
  gameState: GameState;
  playerName: string;
}

export const GameInfo = ({ gameState, playerName }: GameInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/20 backdrop-blur-sm rounded-lg p-4 mb-8 flex justify-between items-center"
    >
      <div className="text-white">
        <span className="font-bold">Round:</span>{' '}
        {gameState.currentRound}
      </div>
      <div className="flex gap-8">
        <div className="text-center">
          <p className="text-white font-bold">{playerName}</p>
          <p className="text-2xl text-white">{gameState.playerScore}</p>
        </div>
        <div className="text-center">
          <p className="text-white font-bold">Computer</p>
          <p className="text-2xl text-white">{gameState.computerScore}</p>
        </div>
      </div>
    </motion.div>
  );
};