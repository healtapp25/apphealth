
import React, { useState, useEffect, useCallback } from "react";
import { User, UserGoal, DailyProgress, UserLevel } from "@/entities/all";
import { format } from "date-fns";
import { motion } from "framer-motion";

import XPBar from "../components/gamification/XPBar";
import Avatar from "../components/gamification/Avatar";
import LevelUpAnimation from "../components/gamification/LevelUpAnimation";
import DailyGoals from "../components/dashboard/dailygoals.js";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userGoal, setUserGoal] = useState(null);
  const [todayProgress, setTodayProgress] = useState(null);
  const [userLevel, setUserLevel] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const today = format(new Date(), 'yyyy-MM-dd');

  const loadUserData = useCallback(async () => {
    try {
      const currentUser = await User.me();

      // Handle unauthenticated state: if User.me() returns null or undefined
      if (!currentUser) {
        console.warn('No authenticated user found. Please log in.');
        setUser(null); // Clear user state
        // In a real application, you might redirect to a login page here.
        setIsLoading(false); // Ensure loading state is cleared even if no user
        return; // Stop further data loading as it depends on a user
      }

      setUser(currentUser);

      // Load or create user goal
      const goals = await UserGoal.filter({ created_by: currentUser.email });
      if (goals.length > 0) {
        setUserGoal(goals[0]);
      } else {
        const newGoal = await UserGoal.create({
          water_goal_ml: 2000,
          calories_goal: 2000,
          is_active: true
        });
        setUserGoal(newGoal);
      }

      // Load or create today's progress
      const todayProgressData = await DailyProgress.filter({ 
        created_by: currentUser.email, 
        date: today 
      });
      if (todayProgressData.length > 0) {
        setTodayProgress(todayProgressData[0]);
      } else {
        const newProgress = await DailyProgress.create({
          date: today,
          water_consumed_ml: 0,
          calories_consumed: 0,
          water_goal_achieved: false,
          calories_goal_achieved: false,
          xp_earned: 0
        });
        setTodayProgress(newProgress);
      }

      // Load or create user level
      const userLevels = await UserLevel.filter({ created_by: currentUser.email });
      if (userLevels.length > 0) {
        setUserLevel(userLevels[0]);
      } else {
        const newLevel = await UserLevel.create({
          current_level: 1,
          current_xp: 0,
          total_xp: 0,
          avatar_image: 'avatar-1'
        });
        setUserLevel(newLevel);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      // Specific handling for authentication errors could go here
      // e.g., if (error.status === 401 || error.message.includes('unauthorized')) {
      //   console.log('Authentication failed, redirecting to login...');
      //   // router.push('/login'); // If a router instance was available
      // }
      setUser(null); // Clear user state on any error
    } finally {
      setIsLoading(false); // Always stop loading, regardless of success or error
    }
  }, [today]);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const updateWaterProgress = async (newAmount) => {
    if (!todayProgress || !userGoal) return;

    const waterGoalAchieved = newAmount >= userGoal.water_goal_ml;
    const wasGoalAchieved = todayProgress.water_goal_achieved;
    
    let xpToAdd = 0;
    if (waterGoalAchieved && !wasGoalAchieved) {
      xpToAdd = 50; // XP for completing water goal
    }

    const updatedProgress = await DailyProgress.update(todayProgress.id, {
      water_consumed_ml: newAmount,
      water_goal_achieved: waterGoalAchieved,
      xp_earned: todayProgress.xp_earned + xpToAdd
    });

    setTodayProgress(updatedProgress);

    if (xpToAdd > 0) {
      await updateUserXP(xpToAdd);
    }
  };

  const updateCaloriesProgress = async (newAmount) => {
    if (!todayProgress || !userGoal) return;

    const caloriesGoalAchieved = newAmount >= userGoal.calories_goal;
    const wasGoalAchieved = todayProgress.calories_goal_achieved;
    
    let xpToAdd = 0;
    if (caloriesGoalAchieved && !wasGoalAchieved) {
      xpToAdd = 75; // XP for completing calories goal
    }

    const updatedProgress = await DailyProgress.update(todayProgress.id, {
      calories_consumed: newAmount,
      calories_goal_achieved: caloriesGoalAchieved,
      xp_earned: todayProgress.xp_earned + xpToAdd
    });

    setTodayProgress(updatedProgress);

    if (xpToAdd > 0) {
      await updateUserXP(xpToAdd);
    }
  };

  const updateUserXP = async (xpToAdd) => {
    if (!userLevel) return;

    const xpForNextLevel = userLevel.current_level * 100;
    const newCurrentXP = userLevel.current_xp + xpToAdd;
    const newTotalXP = userLevel.total_xp + xpToAdd;

    let newLevel = userLevel.current_level;
    let finalCurrentXP = newCurrentXP;
    let newAvatarImage = userLevel.avatar_image;

    if (newCurrentXP >= xpForNextLevel) {
      newLevel++;
      finalCurrentXP = newCurrentXP - xpForNextLevel;
      
      // Update avatar based on level
      const avatarMapping = {
        2: 'avatar-2',
        4: 'avatar-3',
        6: 'avatar-4',
        8: 'avatar-5',
        10: 'avatar-6'
      };
      if (avatarMapping[newLevel]) {
        newAvatarImage = avatarMapping[newLevel];
      }

      setShowLevelUp(true);
    }

    const updatedLevel = await UserLevel.update(userLevel.id, {
      current_level: newLevel,
      current_xp: finalCurrentXP,
      total_xp: newTotalXP,
      avatar_image: newAvatarImage
    });

    setUserLevel(updatedLevel);
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // If user is null after loading and not loading anymore, it means they are not authenticated
  // In this case, you might render a different UI or perform a client-side redirect.
  if (!user) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-screen text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Acesso Negado</h2>
        <p className="text-gray-700 mb-8">
          Você precisa estar logado para acessar o painel.
        </p>
        {/* Example: Add a link to the login page if you have one */}
        {/* <Link href="/login" className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
          Ir para Login
        </Link> */}
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Olá, {user?.full_name || 'Usuário'}!
          </h1>
          <p className="text-gray-600 text-lg">
            Continue sua jornada de saúde hoje
          </p>
        </motion.div>

        {/* User Level and Avatar */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center"
          >
            <Avatar 
              avatarImage={userLevel?.avatar_image} 
              level={userLevel?.current_level || 1}
            />
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              Seu Avatar
            </h3>
            <p className="text-sm text-gray-600">
              Evolui com seus progressos
            </p>
          </motion.div>

          <div className="md:col-span-2">
            <XPBar 
              currentXp={userLevel?.current_xp || 0}
              xpToNextLevel={(userLevel?.current_level || 1) * 100}
              level={userLevel?.current_level || 1}
            />
          </div>
        </div>

        {/* Daily Goals */}
        <DailyGoals 
          waterGoal={userGoal?.water_goal_ml || 2000}
          caloriesGoal={userGoal?.calories_goal || 2000}
          waterConsumed={todayProgress?.water_consumed_ml || 0}
          caloriesConsumed={todayProgress?.calories_consumed || 0}
          onUpdateWater={updateWaterProgress}
          onUpdateCalories={updateCaloriesProgress}
        />

        {/* Today's Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4">Resumo de Hoje</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {todayProgress?.water_consumed_ml || 0}ml
              </p>
              <p className="text-sm text-gray-600">Água consumida</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {todayProgress?.calories_consumed || 0}
              </p>
              <p className="text-sm text-gray-600">Calorias</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {todayProgress?.xp_earned || 0}
              </p>
              <p className="text-sm text-gray-600">XP ganho</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {userLevel?.total_xp || 0}
              </p>
              <p className="text-sm text-gray-600">XP total</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Level Up Animation */}
      <LevelUpAnimation 
        show={showLevelUp}
        level={userLevel?.current_level}
        onComplete={() => setShowLevelUp(false)}
      />
    </div>
  );
}
