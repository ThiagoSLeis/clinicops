'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Loader2, KeyRound, ArrowLeft, CheckCircle2 } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false) // Para mostrar msg de sucesso
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // O truque está aqui: redirectTo
      // Isso diz para onde o usuário vai depois de clicar no link do email
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/update-password`,
      })

      if (error) throw error

      setSuccess(true) // Mostra a tela de "Email enviado"
      
    } catch (err: any) {
      setError(err.message || 'Erro ao enviar email de recuperação.')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Tela de Sucesso (Check verde)
  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-blue-200 text-center">
          <CardHeader>
            <div className="mx-auto bg-green-100 p-3 rounded-full w-fit mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-blue-900">Verifique seu E-mail</CardTitle>
            <CardDescription className="text-slate-600">
              Enviamos um link de recuperação para <strong>{email}</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-500 mb-4">
              Clique no link enviado para criar uma nova senha. Se não encontrar, verifique a caixa de Spam.
            </p>
          </CardContent>
          <CardFooter className="justify-center border-t border-slate-100 p-6">
            <Link href="/" className="text-blue-600 hover:underline font-bold flex items-center gap-2">
              <ArrowLeft size={16} /> Voltar para Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // 📝 Tela de Formulário (Padrão)
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-blue-200">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-2">
            <KeyRound className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-blue-600">
            Recuperar Senha
          </CardTitle>
          <CardDescription className="text-slate-500">
            Digite seu e-mail para receber o link de redefinição.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900 font-medium">Seu E-mail Cadastrado</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="seu@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-blue-100 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button 
              className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all" 
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Enviar Link de Recuperação'}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="justify-center border-t border-blue-50 p-6">
          <Link href="/" className="text-slate-500 hover:text-blue-600 text-sm font-medium flex items-center gap-2 transition-colors">
            <ArrowLeft size={16} /> Voltar para o Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}