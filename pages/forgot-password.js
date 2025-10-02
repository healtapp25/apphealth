import React, { useState } from 'react'
import { supabase } from '@/entities/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')

    try {
      // Guard: supabase may be null during server build if env vars are missing
      if (!supabase) {
        const msg = 'Configuração do Supabase ausente. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY no ambiente (Render Settings → Environment).'
        if (typeof window === 'undefined') {
          console.error(msg)
        }
        throw new Error(msg)
      }
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      
      if (error) throw error
      
      setIsSuccess(true)
      setMessage('Enviamos um link de recuperação para seu email!')
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
              Recuperar Senha
            </CardTitle>
            <p className="text-gray-600 text-sm">
              Digite seu email para receber o link de recuperação
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!isSuccess ? (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-medium">
                    <Mail className="w-4 h-4 text-green-600" />
                    Email cadastrado
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    required
                    className="h-12 border-gray-200 focus:border-green-500 focus:ring-green-500"
                  />
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
                      Enviando...
                    </div>
                  ) : (
                    'Enviar Link de Recuperação'
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900">Email Enviado!</h3>
                  <p className="text-sm text-gray-600">
                    Verifique sua caixa de entrada e clique no link para redefinir sua senha.
                  </p>
                </div>
                <div className="p-3 rounded-lg text-sm bg-green-50 text-green-700 border border-green-200">
                  {message}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar para o login
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

// Avoid static pre-rendering for this page to prevent build-time crashes
export async function getServerSideProps() {
  return { props: {} }
}
