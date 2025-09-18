import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, User, Ruler, Weight } from "lucide-react";
import { motion } from "framer-motion";

export default function BMI() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (weight && height) {
      const weightNum = parseFloat(weight);
      const heightNum = parseFloat(height) / 100; // Convert cm to meters
      const bmiValue = weightNum / (heightNum * heightNum);
      
      setBmi(bmiValue.toFixed(1));
      
      if (bmiValue < 18.5) {
        setCategory('Abaixo do peso');
      } else if (bmiValue < 25) {
        setCategory('Peso normal');
      } else if (bmiValue < 30) {
        setCategory('Sobrepeso');
      } else {
        setCategory('Obesidade');
      }
    }
  };

  const getBMIColor = () => {
    if (!bmi) return 'text-gray-600';
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return 'text-blue-600';
    if (bmiNum < 25) return 'text-green-600';
    if (bmiNum < 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBMIBgColor = () => {
    if (!bmi) return 'bg-gray-100';
    const bmiNum = parseFloat(bmi);
    if (bmiNum < 18.5) return 'bg-blue-100';
    if (bmiNum < 25) return 'bg-green-100';
    if (bmiNum < 30) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Calculator className="w-8 h-8 text-green-600" />
            Calculadora de IMC
          </h1>
          <p className="text-gray-600">
            Calcule seu Índice de Massa Corporal e conheça sua classificação
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-green-100">
                <CardTitle className="flex items-center gap-3 text-green-800">
                  <Calculator className="w-6 h-6" />
                  Dados para Cálculo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-lg font-semibold flex items-center gap-2">
                    <Weight className="w-5 h-5 text-gray-600" />
                    Peso (kg)
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Ex: 70.5"
                    className="text-lg h-12"
                    step="0.1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height" className="text-lg font-semibold flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-gray-600" />
                    Altura (cm)
                  </Label>
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Ex: 175"
                    className="text-lg h-12"
                  />
                </div>

                <Button
                  onClick={calculateBMI}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg rounded-xl"
                  disabled={!weight || !height}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calcular IMC
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardTitle className="flex items-center gap-3 text-blue-800">
                  <User className="w-6 h-6" />
                  Resultado
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {bmi ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-center"
                  >
                    <div className={`w-32 h-32 ${getBMIBgColor()} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className={`text-4xl font-bold ${getBMIColor()}`}>
                        {bmi}
                      </span>
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${getBMIColor()}`}>
                      {category}
                    </h3>
                    <p className="text-gray-600">
                      Seu IMC é <strong>{bmi}</strong>
                    </p>
                  </motion.div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-gray-500">
                      Insira seu peso e altura para calcular o IMC
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* BMI Reference Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Tabela de Classificação do IMC</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                  <div className="text-blue-600 font-bold text-lg mb-2">
                    Abaixo do peso
                  </div>
                  <div className="text-blue-800 font-semibold">
                    Menor que 18,5
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
                  <div className="text-green-600 font-bold text-lg mb-2">
                    Peso normal
                  </div>
                  <div className="text-green-800 font-semibold">
                    18,5 - 24,9
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-200">
                  <div className="text-yellow-600 font-bold text-lg mb-2">
                    Sobrepeso
                  </div>
                  <div className="text-yellow-800 font-semibold">
                    25,0 - 29,9
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg text-center border border-red-200">
                  <div className="text-red-600 font-bold text-lg mb-2">
                    Obesidade
                  </div>
                  <div className="text-red-800 font-semibold">
                    30,0 ou mais
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Important Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6"
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h4 className="font-semibold text-amber-800 mb-2">Importante</h4>
                  <p className="text-amber-700 text-sm">
                    O IMC é uma ferramenta de triagem e não uma ferramenta de diagnóstico. 
                    Para uma avaliação completa da sua saúde, consulte sempre um profissional médico 
                    ou nutricionista qualificado.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}