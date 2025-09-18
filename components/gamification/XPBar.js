import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

export default function XPBar({ currentXp, xpToNextLevel, level }) {
  const progressPercentage = (currentXp / xpToNextLevel) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Nível {level}</h3>
          <p className="text-sm text-gray-600">
            {currentXp} / {xpToNextLevel} XP
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Para próximo nível</p>
          <p className="font-semibold text-green-600">
            {xpToNextLevel - currentXp} XP
          </p>
        </div>
      </div>
      
      <div className="relative">
        <Progress 
          value={progressPercentage} 
          className="h-4 bg-gray-200"
        />
        <motion.div
          className="absolute top-0 left-0 h-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"></div>
      </div>
    </div>
  );
}