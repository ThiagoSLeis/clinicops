'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Loader2, UserPlus } from 'lucide-react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nome, setNome] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nome: nome,
            role: 'admin_clinica',
          },
        },
      })

      if (error) throw error
      router.push('/dashboard') 
      
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Ocorreu um erro ao criar a conta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    // 👇 REMOVI O BG-GRADIENT DAQUI. 
    // Agora ele vai ficar transparente e mostrar o fundo do seu layout principal.
    <div className="flex min-h-screen items-center justify-center p-4">
      
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-blue-200">
        <CardHeader className="text-center space-y-2">
          {/* Ícone com fundo azul claro e ícone azul forte */}
          <div className="mx-auto bg-blue-100 p-3 rounded-full w-fit mb-2">
            <UserPlus className="w-6 h-6 text-blue-600" />
          </div>
          
          {/* Título em Azul Escuro */}
          <CardTitle className="text-2xl font-bold tracking-tight text-blue-600">
            Crie sua conta
          </CardTitle>
          <CardDescription className="text-slate-500">
            Comece a usar o ClinicOps hoje mesmo
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              {/* Labels em Azul Escuro */}
              <Label htmlFor="nome" className="text-blue-900 font-medium">Nome Completo</Label>
              <Input 
                id="nome" 
                placeholder="Ex: Dr. Thiago" 
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="border-blue-100 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-900 font-medium">Email</Label>
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

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-900 font-medium">Senha</Label>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-blue-100 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            {/* BOTÃO AZUL OFICIAL (Primary Blue) */}
            <Button 
              className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all" 
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Criar Conta Grátis'}
            </Button>

          </form>
        </CardContent>
        
        <CardFooter className="justify-center border-t border-blue-50 p-6">
          <p className="text-sm text-slate-600">
            Já tem uma conta?{' '}
            <Link href="/" className="text-blue-600 hover:text-blue-800 hover:underline font-bold">
              Fazer Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}