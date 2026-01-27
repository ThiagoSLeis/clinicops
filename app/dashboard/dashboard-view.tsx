'use client'

import { CreateClinicModal } from '@/components/dashboard/create-clinic-modal'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle, Users, LogOut, Activity, Building2 } from 'lucide-react'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { CreatePatientModal } from '@/components/dashboard/create-patient-modal'
// 1️⃣ ADICIONE ESTE IMPORT
import { useRouter } from 'next/navigation'

interface DashboardViewProps {
  user: any
  usuarioDados: any
  pacientes: any[]
  showOnboarding: boolean
}

export function DashboardView({ user, usuarioDados, pacientes, showOnboarding }: DashboardViewProps) {
  // 2️⃣ INSTANCIE O ROUTER AQUI
  const router = useRouter()
  
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isPatientModalOpen, setIsPatientModalOpen] = useState(false)
  
  const supabase = createClient()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await supabase.auth.signOut()
      window.location.href = '/login'
    } catch (error) {
      console.error('Erro ao sair:', error)
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Header do Sistema */}
      <header className="flex justify-between items-center mb-8 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
            <Activity className="text-blue-600" /> ClinicOps
          </h1>
          <p className="text-slate-500 text-sm">
            Painel do {usuarioDados?.role === 'admin_clinica' ? 'Gestor' : 'Operacional'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">{usuarioDados?.nome}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
            disabled={isLoggingOut}
            title="Sair do sistema"
          >
            {isLoggingOut ? (
              <div className="h-5 w-5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <LogOut size={20} />
            )}
          </Button>
        </div>
      </header>

      {/* Grid de Resumo e Identificação da Clínica */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card da Clínica Atual */}
        <Card className="border-l-4 border-l-green-600 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase flex items-center gap-2">
              <Building2 size={16} /> Clínica Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {usuarioDados?.clinicas?.nome || 'Não configurada'}
            </div>
          </CardContent>
        </Card>

        {/* Card de Total de Pacientes */}
        <Card className="border-l-4 border-l-blue-600 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500 uppercase flex items-center gap-2">
              <Users size={16} /> Total de Pacientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{pacientes.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Pacientes */}
      <Card className="shadow-md border-slate-200">
        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 pb-6">
          <CardTitle className="text-xl text-blue-900 flex items-center gap-2">
            <Users size={20} className="text-blue-600" /> Pacientes Cadastrados
          </CardTitle>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsPatientModalOpen(true)}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Novo Paciente
          </Button>
        </CardHeader>
        <CardContent className="pt-6">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold text-slate-700">Nome</TableHead>
                <TableHead className="font-bold text-slate-700">Telefone</TableHead>
                <TableHead className="font-bold text-slate-700">Data de Cadastro</TableHead>
                <TableHead className="text-right font-bold text-slate-700">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pacientes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-10 text-slate-400">
                    Nenhum paciente encontrado na sua clínica.
                  </TableCell>
                </TableRow>
              ) : (
                pacientes.map((p) => (
                  <TableRow key={p.id} className="hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium text-slate-900">{p.nome}</TableCell>
                    <TableCell className="text-slate-600">{p.telefone || '(00) 00000-0000'}</TableCell>
                    <TableCell className="text-slate-600">{new Date(p.created_at).toLocaleDateString('pt-BR')}</TableCell>
                    <TableCell className="text-right">
                      {/* 3️⃣ ADICIONE O ONCLICK NESTE BOTÃO */}
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => router.push(`/dashboard/pacientes/${p.id}`)}
                      >
                        Ver Prontuário
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modais de Fluxo */}
      <CreateClinicModal isOpen={showOnboarding} />
      
      <CreatePatientModal 
        isOpen={isPatientModalOpen} 
        onClose={() => setIsPatientModalOpen(false)} 
      />
    </div>
  )
}