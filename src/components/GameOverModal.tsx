import { motion } from 'framer-motion';
import { GameState } from '../types';

interface GameOverModalProps {
  gameState: GameState;
  playerName: string;
  onRestart: () => void;
}

export const GameOverModal = ({ gameState, playerName, onRestart }: GameOverModalProps) => {
  const isWinner = gameState.playerScore > gameState.computerScore;
  const isDraw = gameState.playerScore === gameState.computerScore;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl text-center"
      >
        <h2 className="text-3xl font-bold mb-6">
          {isDraw ? "It's a Draw!" : isWinner ? '🎉 You Won! 🎉' : '😔 Game Over'}
        </h2>
        
        <div className="space-y-4 mb-8">
          <p className="text-xl">
            Final Score:
          </p>
          <div className="flex justify-center gap-8 text-lg">
            <div>
              <p className="font-bold text-purple-600">{playerName}</p>
              <p className="text-2xl">{gameState.playerScore}</p>
            </div>
            <div>
              <p className="font-bold text-pink-600">Computer</p>
              <p className="text-2xl">{gameState.computerScore}</p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onRestart}
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold shadow-lg"
        >
          Play Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
};