'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Building2, ShieldCheck, Globe, Zap, LayoutDashboard, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface AdminViewProps {
  clinicas: any[]
}

export function AdminView({ clinicas }: AdminViewProps) {
  return (
    // Aplicando o degradê padrão da sua Home
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-indigo-200 to-cyan-200 p-6 md:p-12">
      
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Superior */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="mb-2 text-slate-600 hover:bg-white/50">
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao Painel
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  ClinicOps <span className="text-blue-600 font-light">Master</span>
                </h1>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Controle de Infraestrutura SaaS</p>
              </div>
            </div>
          </div>

          {/* Status do Sistema Estilizado */}
          <div className="bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-xl flex items-center gap-4">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <div className="text-sm font-semibold text-slate-700">Sistemas Online</div>
          </div>
        </header>

        {/* Grid de Métricas com o estilo dos Cards da Home */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl hover:shadow-2xl transition-all">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 text-xs font-bold uppercase flex items-center gap-2">
                <Globe size={14} className="text-blue-600" /> Total de Clínicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-slate-900">{clinicas?.length || 0}</div>
              <p className="text-slate-400 text-[10px] mt-1 italic tracking-tight">Tenants ativos no banco de dados</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl hover:shadow-2xl transition-all md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 text-xs font-bold uppercase flex items-center gap-2">
                <Zap size={14} className="text-indigo-600" /> Segurança de Rede
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-slate-800">Camada de Isolamento RLS</div>
                <p className="text-slate-500 text-xs mt-1">Garantindo que cada tenant possua seu próprio contêiner lógico de dados.</p>
              </div>
              <div className="hidden sm:block text-[10px] font-mono font-bold px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
                STABLE_NODE
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Clínicas Estilizada */}
        <Card className="bg-white/90 backdrop-blur-md border-white/50 shadow-2xl rounded-3xl overflow-hidden border-t-blue-400/20 border-t-4">
          <CardHeader className="p-6 bg-slate-50/50 flex flex-row items-center justify-between border-b border-slate-100">
            <CardTitle className="text-lg font-bold flex items-center gap-3 text-slate-800">
              <Building2 className="text-blue-600" /> Lista de Instituições
            </CardTitle>
            <LayoutDashboard size={20} className="text-slate-300" />
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50">
                  <TableRow className="hover:bg-transparent border-slate-100">
                    <TableHead className="text-slate-400 py-4 font-bold text-xs uppercase tracking-wider">Nome da Clínica</TableHead>
                    <TableHead className="text-slate-400 py-4 font-bold text-xs uppercase tracking-wider">Onboarding</TableHead>
                    <TableHead className="text-slate-400 py-4 font-bold text-xs uppercase tracking-wider text-right">Instance ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clinicas?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-12 text-slate-400 italic">Nenhum tenant registrado.</TableCell>
                    </TableRow>
                  ) : (
                    clinicas?.map((c) => (
                      <TableRow key={c.id} className="border-slate-50 hover:bg-blue-50/50 transition-all group">
                        <TableCell className="py-5">
                          <div className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{c.nome}</div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5 tracking-tight">Status: ACTIVE_PRODUCTION</div>
                        </TableCell>
                        <TableCell className="text-slate-500 text-sm font-medium">
                          {new Date(c.created_at).toLocaleDateString('pt-BR')}
                        </TableCell>
                        <TableCell className="text-right py-5">
                          <span className="bg-slate-100 text-slate-500 font-mono px-3 py-1 rounded-lg text-[10px] border border-slate-200 group-hover:bg-white group-hover:border-blue-200 group-hover:text-blue-600 transition-all shadow-sm">
                            {c.id}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Footer Discreto */}
        <footer className="text-center pb-8">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">
            ClinicOps SaaS Management Suite • v1.0.0
          </p>
        </footer>
      </div>
    </div>
  )
}