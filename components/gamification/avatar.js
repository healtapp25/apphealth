import React from 'react';
import { motion } from 'framer-motion';

const avatarImages = {
  'avatar-1': '🌱',
  'avatar-2': '🌿', 
  'avatar-3': '🌳',
  'avatar-4': '🦋',
  'avatar-5': '🌟',
  'avatar-6': '🏆'
};

export default function Avatar({ avatarImage, level, animated = false }) {
  const emoji = avatarImages[avatarImage] || avatarImages['avatar-1'];

  return (
    <motion.div
      initial={animated ? { scale: 0 } : {}}
      animate={animated ? { scale: [0, 1.2, 1] } : {}}
      transition={{ type: "spring", duration: 0.6 }}
      className="relative"
    >
      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-4xl">{emoji}</span>
      </div>
      <div className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md border-2 border-green-500">
        <span className="text-sm font-bold text-green-600">{level}</span>
      </div>
    </motion.div>
  );
}