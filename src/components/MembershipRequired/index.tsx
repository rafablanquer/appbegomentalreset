'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Crown, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface MembershipRequiredProps {
  title?: string
  description?: string
  redirectTo?: string
}

export default function MembershipRequired({ 
  title = "Membresía Requerida",
  description = "Este contenido está disponible solo para miembros con membresía activa.",
  redirectTo = "/niveles-de-membresia"
}: MembershipRequiredProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#c4b5a0] to-[#a8b5a0] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-[#a8b5a0] to-[#c4b5a0] rounded-full w-fit">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-[#4a5d4a]">{title}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <p className="text-[#6b7d6b] leading-relaxed">
            {description}
          </p>
          
          <div className="space-y-3">
            <div className="p-4 bg-gradient-to-r from-[#a8b5a0]/20 to-[#c4b5a0]/20 rounded-xl border border-[#a8b5a0]/30">
              <div className="flex items-center justify-center space-x-2 text-[#4a5d4a]">
                <Crown className="h-5 w-5" />
                <span className="font-medium">Acceso Premium</span>
              </div>
              <p className="text-sm text-[#6b7d6b] mt-1">
                Desbloquea todo el contenido de BMR
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Link href={redirectTo}>
              <Button className="w-full bg-gradient-to-r from-[#a8b5a0] to-[#c4b5a0] hover:from-[#8fa08f] hover:to-[#a39093] text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                Ver Planes de Membresía
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link href="/login">
              <Button variant="outline" className="w-full border-[#a8b5a0] text-[#4a5d4a] hover:bg-[#a8b5a0] hover:text-white">
                ¿Ya tienes membresía? Iniciar Sesión
              </Button>
            </Link>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-[#6b7d6b]">
              ¿Necesitas ayuda? 
              <Link href="/contacto" className="text-[#a8b5a0] hover:underline ml-1">
                Contáctanos
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Componente específico para cuando no está autenticado
export function LoginRequired({ 
  title = "Acceso Requerido",
  description = "Debes iniciar sesión para acceder a este contenido.",
  redirectTo = "/login"
}: MembershipRequiredProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#c4b5a0] to-[#a8b5a0] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-[#a8b5a0] to-[#c4b5a0] rounded-full w-fit">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-xl font-bold text-[#4a5d4a]">{title}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 text-center">
          <p className="text-[#6b7d6b] leading-relaxed">
            {description}
          </p>
          
          <div className="space-y-3">
            <Link href={redirectTo}>
              <Button className="w-full bg-gradient-to-r from-[#a8b5a0] to-[#c4b5a0] hover:from-[#8fa08f] hover:to-[#a39093] text-white font-medium py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl">
                Iniciar Sesión
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link href="/niveles-de-membresia">
              <Button variant="outline" className="w-full border-[#a8b5a0] text-[#4a5d4a] hover:bg-[#a8b5a0] hover:text-white">
                ¿No tienes cuenta? Ver Membresías
              </Button>
            </Link>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-[#6b7d6b]">
              ¿Necesitas ayuda? 
              <Link href="/contacto" className="text-[#a8b5a0] hover:underline ml-1">
                Contáctanos
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}