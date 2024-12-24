import { motion } from 'framer-motion';
import { useState } from 'react';
import { GameSettings } from '../types';

interface WelcomeModalProps {
  onStart: (settings: GameSettings) => void;
  initialPlayerName?: string;
}

export const WelcomeModal = ({ onStart, initialPlayerName = '' }: WelcomeModalProps) => {
  const [playerName, setPlayerName] = useState(initialPlayerName);
  const [rounds, setRounds] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (playerName.trim() && rounds > 0) {
      onStart({ 
        playerName: playerName.trim(), 
        rounds 
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Welcome to Rock Paper Scissors!
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your name"
              required
              autoFocus
              minLength={2}
              maxLength={20}
            />
          </div>
          
          <div>
            <label htmlFor="rounds" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Rounds
            </label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => setRounds(prev => Math.max(1, prev - 2))}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <span className="text-xl font-bold text-purple-600 w-12 text-center">
                {rounds}
              </span>
              <button
                type="button"
                onClick={() => setRounds(prev => prev + 2)}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold shadow-lg transition-all"
          >
            Start Game
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};