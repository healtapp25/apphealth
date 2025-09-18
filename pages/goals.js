
import React, { useState, useEffect } from "react";
import { User, UserGoal } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Droplets, Flame, Save } from "lucide-react";
import { motion } from "framer-motion";

export default function Goals() {
  const [user, setUser] = useState(null);
  const [userGoal, setUserGoal] = useState(null);
  const [waterGoal, setWaterGoal] = useState(2000);
  const [caloriesGoal, setCaloriesGoal] = useState(2000);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserGoals();
  }, []);

  const loadUserGoals = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      const goals = await UserGoal.filter({ created_by: currentUser.email });
      if (goals.length > 0) {
        const goal = goals[0];
        setUserGoal(goal);
        setWaterGoal(goal.water_goal_ml);
        setCaloriesGoal(goal.calories_goal);
      }
    } catch (error) {
      // Adjusted error handling: log specific message for user/goal loading,
      // which often involves authentication checks for 'User.me()'
      console.error('Erro ao carregar usuário ou metas (possivelmente autenticação):', error);
      // In a real application, you might want to redirect to a login page
      // or display an authentication-specific error message to the user here.
    } finally {
      setIsLoading(false);
    }
  };

  const saveGoals = async () => {
    setIsSaving(true);
    try {
      if (userGoal) {
        await UserGoal.update(userGoal.id, {
          water_goal_ml: waterGoal,
          calories_goal: caloriesGoal,
          is_active: true
        });
      } else {
        await UserGoal.create({
          water_goal_ml: waterGoal,
          calories_goal: caloriesGoal,
          is_active: true
        });
      }
      await loadUserGoals();
    } catch (error) {
      console.error('Error saving goals:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Target className="w-8 h-8 text-green-600" />
            Minhas Metas
          </h1>
          <p className="text-gray-600">
            Defina suas metas diárias para uma vida mais saudável
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Water Goal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center gap-3 text-blue-800">
                  <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                    <Droplets className="w-6 h-6 text-white" />
                  </div>
                  Meta de Água
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label htmlFor="water-goal" className="text-lg font-semibold">
                    Quantidade diária (ml)
                  </Label>
                  <Input
                    id="water-goal"
                    type="number"
                    value={waterGoal}
                    onChange={(e) => setWaterGoal(Number(e.target.value))}
                    className="text-lg h-12"
                    min="500"
                    max="5000"
                    step="250"
                  />
                  <div className="text-sm text-gray-600">
                    <p>Recomendado: 2000ml - 2500ml por dia</p>
                    <p className="mt-2">🥤 Equivale a aproximadamente {Math.round(waterGoal / 250)} copos de água</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Calories Goal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-orange-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100">
                <CardTitle className="flex items-center gap-3 text-orange-800">
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  Meta de Calorias
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label htmlFor="calories-goal" className="text-lg font-semibold">
                    Calorias diárias (kcal)
                  </Label>
                  <Input
                    id="calories-goal"
                    type="number"
                    value={caloriesGoal}
                    onChange={(e) => setCaloriesGoal(Number(e.target.value))}
                    className="text-lg h-12"
                    min="1200"
                    max="4000"
                    step="100"
                  />
                  <div className="text-sm text-gray-600">
                    <p>Varia conforme: idade, sexo, peso e atividade física</p>
                    <p className="mt-2">⚡ {caloriesGoal} kcal = energia para suas atividades diárias</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Button 
            onClick={saveGoals}
            disabled={isSaving}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Salvar Metas
              </>
            )}
          </Button>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">💡 Dicas para o Sucesso</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Comece com metas realistas e aumente gradualmente</li>
                <li>• Mantenha uma garrafa de água sempre por perto</li>
                <li>• Registre seu progresso diariamente</li>
                <li>• Celebre suas conquistas, mesmo as pequenas!</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
