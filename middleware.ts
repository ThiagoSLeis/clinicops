import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/server-utils' // Ajuste o caminho para onde você renomeou ou onde está o arquivo da utils

export async function middleware(request: NextRequest) {
  // Chama a lógica que você já tem na utils
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}