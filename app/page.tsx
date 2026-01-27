import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, LayoutDashboard, Users, ArrowRight } from "lucide-react";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-cyan-200 p-6">
      <div className="max-w-4xl w-full text-center space-y-10">
        
        {/* Header com Design Moderno */}
        <div className="flex flex-col items-center space-y-6">
          
          {/* Badge "Em desenvolvimento" */}
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold tracking-wide uppercase">
            v1.0.0 • MVP System
          </span>


          {/* O RETÂNGULO AZUL MODERNO QUE VOCÊ PEDIU */}
          <div className="relative group cursor-default">
            {/* Efeito de "Glow" atrás do retângulo */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            
            {/* O Retângulo Principal */}
            <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl shadow-blue-500/20 flex items-center justify-center">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl drop-shadow-sm">
                ClinicOps
              </h1>
            </div>
          </div>


          <p className="max-w-xl text-slate-500 text-lg md:text-xl leading-relaxed mx-auto">
            Plataforma SaaS de Gestão Operacional e Compliance.<br/>
            <span className="text-slate-400 text-base">Multi-tenant • Seguro • Rápido</span>
          </p>
        </div>


        {/* Features Rápidas */}
        <div className="grid gap-6 md:grid-cols-3 text-left">
          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
              <div className="p-2 bg-blue-50 rounded-lg">
                <ShieldCheck className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-base font-semibold text-slate-800">Segurança RLS</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">
                Isolamento total de dados. Uma clínica nunca vê os dados da outra.
              </p>
            </CardContent>
          </Card>


          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
              <div className="p-2 bg-indigo-50 rounded-lg">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <CardTitle className="text-base font-semibold text-slate-800">Multi-tenant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">
                Arquitetura SaaS nativa com suporte a múltiplas organizações.
              </p>
            </CardContent>
          </Card>


          <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
              <div className="p-2 bg-cyan-50 rounded-lg">
                <LayoutDashboard className="h-5 w-5 text-cyan-600" />
              </div>
              <CardTitle className="text-base font-semibold text-slate-800">Auditoria</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-500">
                Logs automáticos de todas as ações sensíveis no sistema.
              </p>
            </CardContent>
          </Card>
        </div>


        {/* Botão de Ação */}
        <div className="pt-6">
          <Link href="/login">
            <Button size="lg" className="h-12 px-8 text-base bg-slate-900 hover:bg-slate-800 shadow-lg hover:shadow-xl transition-all rounded-full group">
              Acessar Plataforma
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        {/* Footerzinho simples */}
        <p className="text-xs text-slate-400">
          Desenvolvido para o Desafio Técnico Dizevolv
        </p>
      </div>
    </main>
  );
}	