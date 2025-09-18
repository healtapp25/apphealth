import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Droplets, Flame, Plus, Minus } from 'lucide-react';

export default function DailyGoals({ 
  waterGoal, 
  caloriesGoal, 
  waterConsumed, 
  caloriesConsumed,
  onUpdateWater,
  onUpdateCalories 
}) {
  const waterPercentage = (waterConsumed / waterGoal) * 100;
  const caloriesPercentage = (caloriesConsumed / caloriesGoal) * 100;

  const addWater = (amount) => {
    onUpdateWater(waterConsumed + amount);
  };

  const addCalories = (amount) => {
    onUpdateCalories(caloriesConsumed + amount);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Water Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Droplets className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Água</h3>
            <p className="text-sm text-gray-600">{waterConsumed}ml / {waterGoal}ml</p>
          </div>
        </div>

        <Progress value={Math.min(waterPercentage, 100)} className="mb-4 h-3" />
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addWater(250)}
            className="flex-1 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            250ml
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addWater(500)}
            className="flex-1 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            500ml
          </Button>
        </div>

        {waterPercentage >= 100 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-3 text-center text-green-600 font-semibold"
          >
            ✅ Meta atingida!
          </motion.div>
        )}
      </motion.div>

      {/* Calories Goal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-orange-100"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
            <Flame className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Calorias</h3>
            <p className="text-sm text-gray-600">{caloriesConsumed} / {caloriesGoal} kcal</p>
          </div>
        </div>

        <Progress value={Math.min(caloriesPercentage, 100)} className="mb-4 h-3" />
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addCalories(100)}
            className="flex-1 hover:bg-orange-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            100 kcal
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => addCalories(250)}
            className="flex-1 hover:bg-orange-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            250 kcal
          </Button>
        </div>

        {caloriesPercentage >= 100 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-3 text-center text-green-600 font-semibold"
          >
            ✅ Meta atingida!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}