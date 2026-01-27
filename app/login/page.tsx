// app/login/page.tsx
'use client'

import Link from 'next/link' // ✅ Adicionado
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useLogin } from './useLogin' 

export default function LoginPage() {
  const { 
    email, setEmail, 
    password, setPassword, 
    showPassword, togglePassword, 
    loading, error, handleLogin 
  } = useLogin()

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg border border-slate-100">
        
        {/* Cabeçalho */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900">ClinicOps</h2>
          <p className="mt-2 text-sm text-slate-600">Acesse sua conta para continuar</p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Campo Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Senha</label>
              <div className="relative mt-1">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 pr-10 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              
              {/* ✅ Link Esqueceu a Senha (Dentro do bloco da senha) */}
              <div className="mt-2 flex justify-end">
                <Link 
                  href="/forgot-password" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Esqueceu a senha?
                </Link>
              </div>
            </div>
          </div>

          {/* Botão de Entrar */}
          <button
            type="submit"
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-70"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Entrar'}
          </button>
        </form>

        {/* Rodapé - Criar Conta */}
        <p className="text-center text-sm text-slate-500">
          Ainda não tem conta?{' '}
          <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-500">
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  )
}