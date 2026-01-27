'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Loader2, Lock, Save } from 'lucide-react'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const router = useRouter()
  const supabase = createClient()

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validação básica
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres.')
      setLoading(false)
      return
    }

    try {
      // Atualiza a senha do usuário LOGADO (o link do email já fez o login)
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) throw error

      // Sucesso! Manda pro Dashboard
      router.push('/dashboard')
      
    } catch (err: any) {
      setError(err.message || 'Erro ao atualizar a senha.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-blue-200">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-2">
            <Lock className="w-6 h-6 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-blue-600">
            Nova Senha
          </CardTitle>
          <CardDescription className="text-slate-500">
            Digite sua nova senha segura abaixo.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900 font-medium">Nova Senha</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="******" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-blue-100 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-blue-900 font-medium">Confirme a Senha</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="******" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="border-blue-100 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button 
              className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all flex items-center justify-center gap-2" 
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
                <>
                  <Save size={18} />
                  Salvar Nova Senha
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}