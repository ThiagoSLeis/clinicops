import { createServerClient } from '@supabase/ssr' // Apenas o cliente vem daqui
import { NextResponse, type NextRequest } from 'next/server' // NextRequest vem DAQUI

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // 1. Se tentar entrar no dashboard/admin sem estar logado -> Login
  if (!user && (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/admin'))) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (user) {
    // Busca o role na sua tabela pública (Model)
    const { data: profile } = await supabase
      .from('usuarios')
      .select('role')
      .eq('id', user.id)
      .single()

    const role = profile?.role

    // 2. Redirecionamento baseado em Role (Fase 3 do seu documento)
    if (role === 'master' && request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    if (role === 'admin_clinica' && request.nextUrl.pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    // 3. Se estiver logado e tentar ir para o login ou register, manda pro lugar certo
    if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/register') {
        const dest = role === 'master' ? '/admin' : '/dashboard'
        return NextResponse.redirect(new URL(dest, request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}