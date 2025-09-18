import React, { useState, useEffect } from 'react'
import { supabase } from '@/entities/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    // Check if we have the required tokens from the URL
    const urlParams = new URLSearchParams(window.location.search)
    const access_token = urlParams.get('access_token')
    const refresh_token = urlParams.get('refresh_token')
    
    if (!access_token || !refresh_token) {
      setMessage('Link inválido ou expirado. Solicite um novo link de recuperação.')
    }
  }, [])

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    if (password !== confirmPassword) {
      setMessage('As senhas não coincidem')
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('A senha deve ter pelo menos 6 caracteres')
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })
      
      if (error) throw error
      
      setIsSuccess(true)
      setMessage('Senha alterada com sucesso!')
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        window.location.href = '/login'
      }, 3000)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
              Nova Senha
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Digite sua nova senha para acessar sua conta
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!isSuccess ? (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2 text-gray-700 font-medium">
                    <Lock className="w-4 h-4 text-green-600" />
                    Nova senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="h-12 pr-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-700 font-medium">
                    <Lock className="w-4 h-4 text-green-600" />
                    Confirmar senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="h-12 pr-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {message && !isSuccess && (
                  <div className="p-3 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200">
                    {message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Alterando senha...
                    </div>
                  ) : (
                    'Alterar Senha'
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Senha Alterada!</h3>
                  <p className="text-sm text-gray-600">
                    Sua senha foi alterada com sucesso. Você será redirecionado para o login.
                  </p>
                </div>
                <div className="p-3 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200">
                  {message}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
