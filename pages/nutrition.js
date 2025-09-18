
import React, { useState, useEffect, useCallback } from "react";
import { Food } from "@/entities/all";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Search, Apple } from "lucide-react";
import { motion } from "framer-motion";

const categoryColors = {
  frutas: "bg-red-100 text-red-800 border-red-200",
  verduras: "bg-green-100 text-green-800 border-green-200",
  cereais: "bg-yellow-100 text-yellow-800 border-yellow-200",
  proteinas: "bg-purple-100 text-purple-800 border-purple-200",
  lacteos: "bg-blue-100 text-blue-800 border-blue-200",
  bebidas: "bg-cyan-100 text-cyan-800 border-cyan-200",
  doces: "bg-pink-100 text-pink-800 border-pink-200",
  outros: "bg-gray-100 text-gray-800 border-gray-200"
};

export default function Nutrition() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  const loadFoods = useCallback(async () => {
    try {
      const foodList = await Food.list('-name');
      setFoods(foodList);
    } catch (error) {
      console.error('Error loading foods:', error);
    } finally {
      setIsLoading(false);
    }
  }, []); // No dependencies, as it only fetches data and sets state

  const filterFoods = useCallback(() => {
    let filtered = foods;

    if (searchTerm) {
      filtered = filtered.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(food => food.category === selectedCategory);
    }

    setFilteredFoods(filtered);
  }, [foods, searchTerm, selectedCategory]); // Dependencies are state variables used in the function

  useEffect(() => {
    loadFoods();
  }, [loadFoods]); // Effect depends on the stable loadFoods function

  useEffect(() => {
    filterFoods();
  }, [filterFoods]); // Effect depends on the stable filterFoods function

  const categories = ['all', ...Object.keys(categoryColors)];

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
            <Book className="w-8 h-8 text-green-600" />
            Tabela Nutricional
          </h1>
          <p className="text-gray-600">
            Consulte valores calóricos e nutricionais dos alimentos
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Pesquisar alimentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category === 'all' ? 'Todos' : category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Food Grid */}
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food, index) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg font-semibold">
                        {food.name}
                      </CardTitle>
                      <Badge 
                        className={`${categoryColors[food.category]} border text-xs`}
                      >
                        {food.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="text-center bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-3">
                        <div className="text-2xl font-bold text-orange-600">
                          {food.calories_per_100g}
                        </div>
                        <div className="text-sm text-gray-600">
                          kcal por 100g
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-sm">
                        <div className="text-center bg-blue-50 rounded-lg p-2">
                          <div className="font-semibold text-blue-600">
                            {food.protein || 0}g
                          </div>
                          <div className="text-xs text-gray-600">Proteína</div>
                        </div>
                        <div className="text-center bg-yellow-50 rounded-lg p-2">
                          <div className="font-semibold text-yellow-600">
                            {food.carbs || 0}g
                          </div>
                          <div className="text-xs text-gray-600">Carboidr.</div>
                        </div>
                        <div className="text-center bg-purple-50 rounded-lg p-2">
                          <div className="font-semibold text-purple-600">
                            {food.fat || 0}g
                          </div>
                          <div className="text-xs text-gray-600">Gordura</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Apple className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Nenhum alimento encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar sua busca ou filtros
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
