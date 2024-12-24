import { motion } from 'framer-motion';
import { Choice } from '../types';
import { getEmojiForChoice } from '../utils/emojiMap';

interface ChoiceButtonProps {
  choice: Choice;
  onClick: () => void;
  disabled?: boolean;
}

export const ChoiceButton = ({ choice, onClick, disabled }: ChoiceButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow text-4xl
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={onClick}
      disabled={disabled}
    >
      {getEmojiForChoice(choice)}
    </motion.button>
  );
};