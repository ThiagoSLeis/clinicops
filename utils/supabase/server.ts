import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  // 1. Agora precisamos do 'await' aqui
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // 2. O getAll usa o cookieStore que já carregamos
        getAll() {
          return cookieStore.getAll()
        },
        // 3. O setAll também
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // O erro 'The "set" method was called on a Server Component' pode ser ignorado
            // Isso acontece porque Server Components não podem setar cookies (só Server Actions e Middleware)
          }
        },
      },
    }
  )
}