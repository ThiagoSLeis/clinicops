'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Action para criar uma nova clínica e vincular ao usuário logado.
 * Essencial para a Fase 4 do PRD (Onboarding e Cadastro de Clínicas).
 */
export async function createClinicAction(data: { nome: string }) {
  const supabase = await createClient()

  // 1. Verificar autenticação do usuário
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    throw new Error("Sessão expirada ou usuário não autenticado.")
  }

  // 2. Criar a clínica
  // IMPORTANTE: Não usamos 'minimal' porque precisamos do ID retornado
  // para vincular ao usuário e ativar o RLS de segregação.
  const { data: clinica, error: clinicaError } = await supabase
    .from('clinicas')
    .insert({ nome: data.nome })
    .select('id')
    .single()

  if (clinicaError) {
    // Se der erro 42501 aqui, significa que a Policy de INSERT não foi aplicada no SQL Editor
    console.error("Erro ao inserir clínica:", clinicaError.message)
    throw new Error(`Erro ao criar clínica: ${clinicaError.message}`)
  }

  // 3. Vincular o usuário à nova clínica
  // Isso preenche o campo 'clinica_id' na tabela 'usuarios'
  const { error: userUpdateError } = await supabase
    .from('usuarios')
    .update({ clinica_id: clinica.id })
    .eq('id', user.id)

  if (userUpdateError) {
    console.error("Erro ao vincular usuário:", userUpdateError.message)
    throw new Error("Clínica criada, mas falha ao vincular seu perfil. Contrate o suporte.")
  }

  // 4. Revalidar o layout do Dashboard
  // Isso força o Next.js a buscar os dados novamente, o que fará o modal 
  // sumir porque agora o 'clinica_id' não é mais nulo.
  revalidatePath('/dashboard')

  return { success: true }
}
export async function createPatientAction(data: { nome: string, telefone: string }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Busca a clinica_id do usuário logado
  const { data: usuario } = await supabase
    .from('usuarios')
    .select('clinica_id')
    .eq('id', user?.id)
    .single()

  if (!usuario?.clinica_id) throw new Error("Vincule uma clínica primeiro.")

  // Insere o paciente com o tenant (clinica_id) correto
  const { error } = await supabase
    .from('pacientes')
    .insert({
      nome: data.nome,
      telefone: data.telefone,
      clinica_id: usuario.clinica_id
    })

  if (error) throw new Error(error.message)
  revalidatePath('/dashboard')
  return { success: true }
}