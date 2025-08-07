"use client"

import { useState } from "react"
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <h1 className="text-2xl font-normal text-gray-800 mb-8">Acceder</h1>

                    <form className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-sm font-normal text-gray-700">
                                Nombre de usuario o correo electrónico
                            </Label>
                            <Input
                                id="username"
                                type="text"
                                defaultValue="Erick"
                                className="h-12 bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-sm font-normal text-gray-700">
                                    Contraseña
                                </Label>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    Mostrar contraseña
                                </button>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    defaultValue="........................"
                                    className="h-12 bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400 pr-4"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />
                            <Label
                                htmlFor="remember"
                                className="text-sm font-normal text-gray-700 cursor-pointer"
                            >
                                Recuérdame
                            </Label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-slate-700 hover:bg-slate-800 text-white font-normal text-base"
                        >
                            Acceder
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            href="/forgot-password"
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            ¿Has perdido tu contraseña?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
