import React, { useState, useEffect } from "react";
import { User } from "@/entities/all";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserCircle, Save, Weight, Ruler, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  // Form data
  const [formData, setFormData] = useState({
    full_name: '',
    weight: '',
    height: '',
    birth_date: '',
    gender: ''
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const currentUser = await User.me();
    setUser(currentUser);
    
    setFormData({
      full_name: currentUser.full_name || '',
      weight: currentUser.weight || '',
      height: currentUser.height || '',
      birth_date: currentUser.birth_date || '',
      gender: currentUser.gender || ''
    });
    
    setIsLoading(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    const updateData = {
      weight: formData.weight ? Number(formData.weight) : null,
      height: formData.height ? Number(formData.height) : null,
      birth_date: formData.birth_date || null,
      gender: formData.gender || null
    };

    await User.updateMyUserData(updateData);
    await loadUserData();
    setIsSaving(false);
  };

  const calculateAge = () => {
    if (!formData.birth_date) return null;
    const today = new Date();
    const birthDate = new Date(formData.birth_date);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const calculateBMI = () => {
    if (!formData.weight || !formData.height) return null;
    const weightNum = Number(formData.weight);
    const heightNum = Number(formData.height) / 100;
    return (weightNum / (heightNum * heightNum)).toFixed(1);
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
            <UserCircle className="w-8 h-8 text-green-600" />
            Meu Perfil
          </h1>
          <p className="text-gray-600">
            Gerencie suas informações pessoais
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Informações Básicas */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="flex items-center gap-3 text-green-800">
                  <UserCircle className="w-6 h-6" />
                  Informações Básicas
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="full_name" className="text-sm font-semibold">
                    Nome Completo
                  </Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    disabled
                    className="bg-gray-50 text-gray-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    O nome não pode ser alterado
                  </p>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-semibold">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-gray-50 text-gray-600"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    O email não pode ser alterado
                  </p>
                </div>

                <div>
                  <Label htmlFor="birth_date" className="text-sm font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Data de Nascimento
                  </Label>
                  <Input
                    id="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => handleInputChange('birth_date', e.target.value)}
                  />
                  {calculateAge() && (
                    <p className="text-xs text-green-600 mt-1">
                      {calculateAge()} anos
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Gênero
                  </Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione seu gênero" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Medidas Corporais */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center gap-3 text-blue-800">
                  <Weight className="w-6 h-6" />
                  Medidas Corporais
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="weight" className="text-sm font-semibold flex items-center gap-2">
                    <Weight className="w-4 h-4" />
                    Peso Atual (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Ex: 70.5"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    step="0.1"
                  />
                </div>

                <div>
                  <Label htmlFor="height" className="text-sm font-semibold flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    Altura (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Ex: 175"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                  />
                </div>

                {calculateBMI() && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-gray-800 mb-2">Seu IMC Atual</h4>
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {calculateBMI()}
                    </div>
                    <p className="text-sm text-gray-600">
                      Índice de Massa Corporal
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Botão Salvar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <Button 
            onClick={handleSave}
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
                Salvar Alterações
              </>
            )}
          </Button>
        </motion.div>

        {/* Informações Adicionais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Dicas Importantes</h4>
                  <ul className="text-amber-700 text-sm space-y-1">
                    <li>• Mantenha seu peso atualizado para cálculos mais precisos</li>
                    <li>• Suas informações são privadas e seguras</li>
                    <li>• Use a calculadora de IMC para monitorar sua saúde</li>
                    <li>• Dados completos melhoram suas metas personalizadas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}