'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export function useRegister() {
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
            role: 'admin_clinica', // Define o papel padrão
          },
        },
      })

      if (error) throw error
      
      // Sucesso: Manda pro Dashboard
      router.push('/')
      alert('Conta criada com sucesso! Agora faça o login.') 
      
    } catch (err: any) {
      console.error(err)
      setError(err.message || 'Ocorreu um erro ao criar a conta.')
    } finally {
      setLoading(false)
    }
  }

  return {
    // Estados
    email, setEmail,
    password, setPassword,
    nome, setNome,
    loading,
    error,
    // Ações
    handleRegister
  }
}