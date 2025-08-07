"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const router = useRouter()
    const searchParams = useSearchParams()
    const redirectTo = searchParams.get('redirect') || '/home-app'

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            const data = await response.json()

            if (response.ok && data.token) {
                // Login exitoso
                router.push(redirectTo)
            } else {
                setError(data.message || 'Error al iniciar sesión')
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('Error de conexión. Inténtalo de nuevo.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-lg shadow-sm border p-8">
                    <h1 className="text-2xl font-normal text-gray-800 mb-8">Acceder</h1>

                    {error && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-normal text-gray-700">
                                Correo electrónico
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="tu@email.com"
                                className="h-12 bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                                disabled={loading}
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
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    Mostrar contraseña
                                </button>
                            </div>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="Tu contraseña"
                                    className="h-12 bg-blue-50 border-blue-200 focus:border-blue-400 focus:ring-blue-400 pr-4"
                                    disabled={loading}
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
                            disabled={loading || !email || !password}
                            className="w-full h-12 bg-slate-700 hover:bg-slate-800 text-white font-normal text-base disabled:opacity-50"
                        >
                            {loading ? "Iniciando sesión..." : "Acceder"}
                        </Button>
                    </form>

                    <div className="mt-6 space-y-4 text-center">
                        <Link
                            href="/forgot-password"
                            className="block text-sm text-gray-500 hover:text-gray-700"
                        >
                            ¿Has perdido tu contraseña?
                        </Link>

                        <div className="border-t pt-4">
                            <p className="text-sm text-gray-600 mb-2">
                                ¿No tienes cuenta?
                            </p>
                            <Link
                                href="/niveles-de-membresia"
                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Ver planes de membresía
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gradient-to-b from-[#c4b5a0] to-[#a8b5a0] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a5d4a] mx-auto mb-4"></div>
                    <p className="text-[#4a5d4a] font-medium">Cargando...</p>
                </div>
            </div>
        }>
            <LoginForm />
        </Suspense>
    )
}
