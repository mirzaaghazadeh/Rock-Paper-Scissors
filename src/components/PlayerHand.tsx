import { motion } from 'framer-motion';
import { Choice } from '../types';
import { getEmojiForChoice } from '../utils/emojiMap';

interface PlayerHandProps {
  choice: Choice | null;
  isPlaying: boolean;
  side: 'left' | 'right';
}

export const PlayerHand = ({ choice, isPlaying, side }: PlayerHandProps) => {
  const shakeAnimation = {
    y: [0, -50, 0],
    rotate: side === 'left' ? [-90, -90, -90] : [90, 90, 90],
  };

  const variants = {
    initial: {
      y: 0,
      rotate: side === 'left' ? -90 : 90,
      scale: 1,
      filter: 'drop-shadow(0 0 0px rgba(255,255,255,0))',
    },
    playing: {
      ...shakeAnimation,
      transition: {
        duration: 0.4,
        repeat: Infinity,
        ease: "easeInOut",
      }
    },
    reveal: {
      y: 0,
      rotate: 0,
      scale: 1.2,
      filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))',
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.5,
      }
    },
    hover: {
      scale: 1.1,
      filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.7))',
    }
  };

  return (
    <motion.div
      initial="initial"
      animate={isPlaying ? "playing" : choice ? "reveal" : "initial"}
      whileHover="hover"
      variants={variants}
      className="text-8xl inline-block cursor-default"
    >
      {choice ? getEmojiForChoice(choice) : '✊'}
    </motion.div>
  );
};