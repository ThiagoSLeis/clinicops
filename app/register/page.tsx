import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { RegisterView } from './register-view'

export default async function RegisterPage() {
  const supabase = await createClient()

  // Verifica se já existe sessão
  const { data: { session } } = await supabase.auth.getSession()

  // Se já estiver logado, joga direto pro Dashboard
  if (session) {
    redirect('/dashboard')
  }

  // Se não, mostra a tela de registro
  return <RegisterView />
}