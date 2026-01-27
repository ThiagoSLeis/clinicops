import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AdminView } from '@/app/admin/admin-view'

export default async function AdminMasterPage() {
  const supabase = await createClient()

  // 1. Verifica autenticação e Role
  const { data: { user } } = await supabase.auth.getUser()
  const { data: perfil } = await supabase
    .from('usuarios')
    .select('role')
    .eq('id', user?.id)
    .single()

  // 2. Proteção de rota
  if (perfil?.role !== 'master') {
    redirect('/dashboard')
  }

  // 3. Busca global de clínicas
  const { data: clinicas } = await supabase
    .from('clinicas')
    .select('*')
    .order('created_at', { ascending: false })

  return <AdminView clinicas={clinicas || []} />
}