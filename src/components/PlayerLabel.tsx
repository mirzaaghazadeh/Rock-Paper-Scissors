import { motion } from 'framer-motion';

interface PlayerLabelProps {
  label: string;
  isActive: boolean;
}

export const PlayerLabel = ({ label, isActive }: PlayerLabelProps) => {
  return (
    <motion.div
      animate={{
        scale: isActive ? 1.1 : 1,
        color: isActive ? '#ffffff' : '#cbd5e1'
      }}
      className="text-xl font-bold mb-2"
    >
      {label}
    </motion.div>
  );
};