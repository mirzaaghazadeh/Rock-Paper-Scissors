import { motion, AnimatePresence } from 'framer-motion';
import { Choice } from '../types';
import { PlayerHand } from './PlayerHand';
import { PlayerLabel } from './PlayerLabel';

interface GameArenaProps {
  playerChoice: Choice | null;
  computerChoice: Choice | null;
  isPlaying: boolean;
}

export const GameArena = ({ playerChoice, computerChoice, isPlaying }: GameArenaProps) => {
  return (
    <div className="relative mb-12">
      <motion.div 
        className="absolute inset-0 bg-white/5 rounded-xl"
        animate={{
          boxShadow: isPlaying ? '0 0 30px rgba(255,255,255,0.2)' : '0 0 0px rgba(255,255,255,0)'
        }}
      />
      
      <div className="flex justify-between items-center h-48 px-12 py-6">
        <div className="flex-1 text-center">
          <PlayerLabel label="YOU" isActive={!computerChoice && !!playerChoice} />
          <AnimatePresence mode="wait">
            <PlayerHand
              choice={playerChoice}
              isPlaying={isPlaying}
              side="left"
            />
          </AnimatePresence>
        </div>

        <motion.div 
          className="text-white text-4xl font-bold mx-8"
          animate={{
            scale: isPlaying ? [1, 1.2, 1] : 1,
            opacity: isPlaying ? 1 : 0.7,
          }}
          transition={{
            duration: 0.5,
            repeat: isPlaying ? Infinity : 0,
          }}
        >
          VS
        </motion.div>

        <div className="flex-1 text-center">
          <PlayerLabel label="COMPUTER" isActive={!!computerChoice} />
          <AnimatePresence mode="wait">
            <PlayerHand
              choice={computerChoice}
              isPlaying={isPlaying}
              side="right"
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};