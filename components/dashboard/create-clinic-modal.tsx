'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClinicAction } from '@/app/dashboard/action' // Certifique-se que o caminho está correto
import { Loader2, Building2 } from 'lucide-react'

// Esquema de validação seguindo as regras de consistência de dados
const clinicSchema = z.object({
  nome: z.string().min(3, "O nome da clínica deve ter pelo menos 3 caracteres")
})

type ClinicFormValues = z.infer<typeof clinicSchema>

export function CreateClinicModal({ isOpen }: { isOpen: boolean }) {
  const [loading, setLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<ClinicFormValues>({
    resolver: zodResolver(clinicSchema)
  })

  const onSubmit = async (values: ClinicFormValues) => {
    setLoading(true)
    try {
      // Chamamos a Action enviando o objeto completo { nome: '...' }
      // Internamente, a action NÃO usa 'minimal' para capturar o ID da clínica
      await createClinicAction(values)
      
      // Não precisamos fechar o modal manualmente aqui, pois o revalidatePath 
      // na Action fará o servidor re-renderizar a página e o Onboarding sumirá
    } catch (error) {
      console.error("Erro no Onboarding:", error)
      alert("Erro ao configurar sua clínica. Verifique sua conexão e tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen}>
      {/* onPointerDownOutside evita que o usuário feche o modal clicando fora antes de configurar */}
      <DialogContent 
        className="sm:max-w-[425px]" 
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="items-center">
          <div className="bg-blue-100 p-3 rounded-full w-fit mb-2">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <DialogTitle className="text-xl font-bold text-blue-900 text-center">
            Configurar sua Clínica
          </DialogTitle>
          <DialogDescription className="text-center">
            Para começar a gerir seus pacientes, precisamos do nome da sua clínica ou consultório.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="nome" className="text-blue-900">Nome da Clínica</Label>
            <Input 
              id="nome" 
              placeholder="Ex: Clínica Médica Central" 
              {...register('nome')}
              className={errors.nome ? "border-red-500" : "border-blue-100"}
              disabled={loading}
            />
            {errors.nome && (
              <p className="text-xs text-red-500 font-medium">
                {errors.nome.message}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors" 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Configurando...
              </>
            ) : (
              "Finalizar Cadastro"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}