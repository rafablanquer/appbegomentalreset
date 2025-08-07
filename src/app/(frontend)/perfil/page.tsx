import { Metadata } from 'next'
import ContactPage from '@/domains/contact/components/ContactPage'
import LandingMembresiasPage from '@/domains/landing/components/LandingMembresiasPage'
import HomeAppPage from '@/domains/home/components/HomeAppPage'

'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Calendar, Crown, Settings, Bell, Shield, HelpCircle, LogOut, ChevronRight, Star } from 'lucide-react'

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#c4b5a0] to-[#a8b5a0] p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pt-4">
                <h1 className="text-2xl font-bold text-[#4a5d4a]">Mi Perfil</h1>
                {/* <Button variant="ghost" size="icon" className="text-[#4a5d4a]">
                    <Settings className="h-5 w-5" />
                </Button> */}
            </div>

            {/* User Info Card */}
            <Card className="mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                        <Avatar className="h-16 w-16 border-2 border-[#a8b5a0]">
                            <AvatarImage src="/placeholder.svg?height=64&width=64&text=E" />
                            <AvatarFallback className="bg-[#a8b5a0] text-white text-xl font-semibold">E</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold text-[#4a5d4a]">Erick Mendoza</h2>
                            <p className="text-[#6b7d6b] text-sm">Miembro desde Enero 2024</p>
                            <Badge className="mt-1 bg-[#a8b5a0] text-white hover:bg-[#8fa08f]">
                                <Crown className="h-3 w-3 mr-1" />
                                Premium
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm">
                        <div className="flex items-center text-[#6b7d6b]">
                            <User className="h-4 w-4 mr-2" />
                            <span>erick.mendoza</span>
                        </div>
                        <div className="flex items-center text-[#6b7d6b]">
                            <Mail className="h-4 w-4 mr-2" />
                            <span>sirhofcybersec@gmail.com</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Membership Status */}
            <Card className="mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-[#4a5d4a] flex items-center">
                        <Crown className="h-5 w-5 mr-2 text-[#a8b5a0]" />
                        Mi Membresía
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <h3 className="font-semibold text-[#4a5d4a]">Plan Premium Mensual</h3>
                            <p className="text-sm text-[#6b7d6b]">Acceso completo a BMR</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-[#4a5d4a]">$0.00</p>
                            <p className="text-xs text-[#6b7d6b]">por mes</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-[#6b7d6b] mb-4">
                        <span>Próximo pago:</span>
                        <span>15 Sep 2024</span>
                    </div>

                    <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1 border-[#a8b5a0] text-[#4a5d4a] hover:bg-[#a8b5a0] hover:text-white">
                            Cambiar Plan
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 border-[#a8b5a0] text-[#4a5d4a] hover:bg-[#a8b5a0] hover:text-white">
                            Cancelar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Progress Stats */}
            <Card className="mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-[#4a5d4a]">Mi Progreso</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-[#4a5d4a]">28</div>
                            <div className="text-xs text-[#6b7d6b]">Días activo</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#4a5d4a]">156</div>
                            <div className="text-xs text-[#6b7d6b]">Sesiones</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#4a5d4a]">42h</div>
                            <div className="text-xs text-[#6b7d6b]">Tiempo total</div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Menu Options */}
            <Card className="mb-6 bg-white/90 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
                <CardContent className="p-0">
                    <div className="space-y-0">
                        <MenuOption icon={Bell} label="Notificaciones" />
                        <Separator className="mx-4" />
                        <MenuOption icon={Shield} label="Privacidad y Seguridad" />
                        <Separator className="mx-4" />
                        <MenuOption icon={HelpCircle} label="Ayuda y Soporte" />
                        <Separator className="mx-4" />
                        <MenuOption icon={Star} label="Calificar App" />
                    </div>
                </CardContent>
            </Card>

            {/* Logout Button */}
            <Button
                variant="outline"
                className="w-full mb-8 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
            </Button>
        </div>
    )
}

function MenuOption({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <button className="w-full flex items-center justify-between p-4 hover:bg-[#f8f9f8] transition-colors">
            <div className="flex items-center">
                <Icon className="h-5 w-5 text-[#6b7d6b] mr-3" />
                <span className="text-[#4a5d4a] font-medium">{label}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-[#6b7d6b]" />
        </button>
    )
}
