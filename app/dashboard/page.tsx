import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { DashboardView } from './dashboard-view'

/**
 * Página principal do Dashboard (Server Component).
 * Gerencia a autenticação, busca de dados e controle de Onboarding.
 */
export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Verifica autenticação do usuário
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  // Se não houver usuário ou houver erro de sessão, manda para a Home/Login
  if (authError || !user) {
    redirect('/')
  }

  // 2. Busca dados do perfil com o JOIN para pegar o nome da clínica
  const { data: usuarioDados } = await supabase
    .from('usuarios')
    .select(`
      nome, 
      clinica_id, 
      role,
      clinicas ( nome )
    `)
    .eq('id', user.id)
    .single()

  // 3. Busca a lista de pacientes vinculados à clínica do usuário
  // O RLS (Row Level Security) garante que ele veja apenas os dados da clínica dele
  const { data: pacientes } = await supabase
    .from('pacientes')
    .select('*')
    .order('created_at', { ascending: false })

  // Tratamento de erro: se a tabela estiver vazia, retorna array vazio
  const listaPacientes = pacientes || []

  // 4. Renderiza a View do Cliente passando os dados necessários
  return (
    <DashboardView 
      user={user}
      usuarioDados={usuarioDados}
      pacientes={listaPacientes}
      // Lógica de Onboarding: Se o clinica_id for nulo, o modal de criação aparecerá
      showOnboarding={!usuarioDados?.clinica_id}
    />
  )
}