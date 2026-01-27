import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, User, Phone, Calendar, ClipboardList, FileText, Activity } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function ProntuarioPage(props: any) {
  const params = await props.params
  const id = params.id
  const supabase = await createClient()

  const { data: paciente, error } = await supabase
    .from('pacientes')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !paciente) return notFound()

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Barra Superior */}
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" className="hover:bg-white shadow-sm border border-transparent hover:border-slate-200 transition-all gap-2">
              <ArrowLeft size={16} /> Voltar ao Painel
            </Button>
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white">Imprimir PDF</Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Nova Evolução</Button>
          </div>
        </div>

        {/* Cabeçalho Principal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 shadow-sm border-none bg-white">
            <CardContent className="pt-6">
              <div className="flex items-start gap-5">
                <div className="bg-blue-600 h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                  <User size={32} />
                </div>
                <div className="space-y-1">
                  <h1 className="text-2xl font-bold text-slate-900">{paciente.nome}</h1>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-1.5"><Phone size={14} className="text-blue-500" /> {paciente.telefone || 'Não informado'}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-500" /> Cadastro: {new Date(paciente.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-none bg-blue-600 text-white">
            <CardContent className="pt-6 text-center">
              <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">Status do Prontuário</p>
              <div className="text-3xl font-bold mt-2">Ativo</div>
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500 text-white border border-blue-400">
                Isolamento RLS Ativo
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Área de Conteúdo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Menu Lateral Interno */}
          <div className="space-y-2">
            <Button variant="secondary" className="w-full justify-start gap-3 bg-white border border-slate-200">
              <ClipboardList size={18} className="text-blue-600" /> Evoluções
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
              <FileText size={18} /> Exames
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-slate-600">
              <Activity size={18} /> Prescrições
            </Button>
          </div>

          {/* Timeline de Evolução */}
          <div className="md:col-span-3 space-y-4">
            <Card className="shadow-sm border-none">
              <CardHeader className="pb-3 border-b border-slate-50">
                <CardTitle className="text-lg font-semibold text-slate-800">Histórico de Atendimento</CardTitle>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="relative border-l-2 border-slate-100 ml-3 pb-4">
                  <div className="mb-10 ml-6">
                    <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full bg-blue-600 border-4 border-white shadow-sm"></span>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-tight">Entrada no Sistema</span>
                        <span className="text-xs text-slate-400">{new Date(paciente.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <p className="text-sm text-slate-600">Paciente cadastrado na plataforma ClinicOps. Prontuário digital inicializado com sucesso.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <div className="bg-slate-100 p-4 rounded-full mb-4">
                    <FileText className="text-slate-400" size={30} />
                  </div>
                  <h3 className="text-slate-900 font-medium">Nenhuma nota clínica hoje</h3>
                  <p className="text-slate-500 text-sm max-w-xs mt-1">Clique em "Nova Evolução" para registrar o atendimento atual.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}