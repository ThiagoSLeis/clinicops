// app/forgot-password/useForgotPassword.ts
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export function useForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const supabase = createClient()

    // O redirectTo é para onde o usuário vai depois de clicar no link do email
    // Vamos criar essa página '/update-password' no próximo passo
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/update-password`,
    })

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ 
        type: 'success', 
        text: 'Se houver uma conta com este e-mail, enviaremos um link de recuperação.' 
      })
    }
    
    setLoading(false)
  }

  return {
    email,
    setEmail,
    loading,
    message,
    handleResetPassword
  }
}