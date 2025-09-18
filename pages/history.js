
import React, { useState, useEffect, useCallback } from "react";
import { User, DailyProgress } from "@/entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingUp, Droplets, Flame, Award } from "lucide-react";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";

export default function History() {
  const [user, setUser] = useState(null);
  const [progressHistory, setProgressHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDays: 0,
    waterGoalsAchieved: 0,
    caloriesGoalsAchieved: 0,
    totalXpEarned: 0
  });

  const calculateStats = (progress) => {
    const stats = {
      totalDays: progress.length,
      waterGoalsAchieved: progress.filter(p => p.water_goal_achieved).length,
      caloriesGoalsAchieved: progress.filter(p => p.calories_goal_achieved).length,
      totalXpEarned: progress.reduce((sum, p) => sum + (p.xp_earned || 0), 0)
    };
    setStats(stats);
  };

  const loadHistoryData = useCallback(async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      const progress = await DailyProgress.filter({ 
        created_by: currentUser.email 
      }, '-date', 30); // Last 30 days
      
      setProgressHistory(progress);
      calculateStats(progress);
    } catch (error) {
      console.error('Error loading history data:', error);
      setUser(null);
      setProgressHistory([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistoryData();
  }, [loadHistoryData]);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            Histórico de Performance
          </h1>
          <p className="text-gray-600">
            Acompanhe seu progresso ao longo do tempo
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="text-center border-blue-200">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {stats.totalDays}
                </div>
                <div className="text-sm text-gray-600">Dias registrados</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="text-center border-blue-200">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {stats.waterGoalsAchieved}
                </div>
                <div className="text-sm text-gray-600">Metas de água</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="text-center border-orange-200">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600 mb-1">
                  {stats.caloriesGoalsAchieved}
                </div>
                <div className="text-sm text-gray-600">Metas de calorias</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="text-center border-green-200">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {stats.totalXpEarned}
                </div>
                <div className="text-sm text-gray-600">XP total</div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Progress History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-green-600" />
                Progresso Diário
              </CardTitle>
            </CardHeader>
            <CardContent>
              {progressHistory.length > 0 ? (
                <div className="space-y-4">
                  {progressHistory.map((progress, index) => (
                    <motion.div
                      key={progress.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {format(new Date(progress.date), 'dd/MM/yyyy')}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {format(new Date(progress.date), 'EEEE', { locale: ptBR })}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <Droplets className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium">
                              {progress.water_consumed_ml}ml
                            </span>
                            {progress.water_goal_achieved && (
                              <Badge className="bg-green-100 text-green-800">✓</Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Flame className="w-4 h-4 text-orange-500" />
                            <span className="text-sm font-medium">
                              {progress.calories_consumed} kcal
                            </span>
                            {progress.calories_goal_achieved && (
                              <Badge className="bg-green-100 text-green-800">✓</Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-purple-500" />
                            <span className="text-sm font-medium">
                              {progress.xp_earned} XP
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">Nenhum progresso registrado ainda</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Comece a registrar suas metas para ver seu histórico aqui
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
