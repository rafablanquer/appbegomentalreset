"use client"

import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

type UsersResponse = {
    totalDocs: number
    docs: Array<{ createdAt: string; membershipStatus?: string; membershipType?: string | null }>
}

type PaymentsResponse = {
    totalDocs: number
    docs: Array<{ createdAt: string; amount?: number | null }>
}

function formatNumber(value: number): string {
    return new Intl.NumberFormat('es-ES').format(value)
}

function startOfDay(date: Date): Date {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    return d
}

function subDays(date: Date, days: number): Date {
    const d = new Date(date)
    d.setDate(d.getDate() - days)
    return d
}

const cardClass = 'rounded-md border border-neutral-800 bg-neutral-950 p-4'

export const AdminDashboard: React.FC = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [totalUsers, setTotalUsers] = useState(0)
    const [activeMembers, setActiveMembers] = useState(0)
    const [recentUsers, setRecentUsers] = useState<Array<{ createdAt: string }>>([])

    const [payments30, setPayments30] = useState<Array<{ createdAt: string; amount: number }>>([])

    useEffect(() => {
        let isMounted = true

        async function load() {
            try {
                setLoading(true)

                const today = new Date()
                const since7 = subDays(today, 14) // 14 días para una gráfica un poco más larga
                const since30 = subDays(today, 30)

                const [usersCountRes, usersRecentRes, usersActiveRes, paymentsRecentRes] = await Promise.all([
                    fetch(`/api/users?limit=1`, { credentials: 'include' }),
                    fetch(
                        `/api/users?where[createdAt][greater_than_or_equal]=${encodeURIComponent(
                            since7.toISOString(),
                        )}&limit=1000&sort=createdAt`,
                        { credentials: 'include' },
                    ),
                    fetch(
                        `/api/users?where[membershipStatus][equals]=active&limit=1`,
                        { credentials: 'include' },
                    ),
                    fetch(
                        `/api/membership-payments?where[createdAt][greater_than_or_equal]=${encodeURIComponent(
                            since30.toISOString(),
                        )}&limit=1000&sort=createdAt`,
                        { credentials: 'include' },
                    ),
                ])

                if (!isMounted) return

                if (!usersCountRes.ok || !usersRecentRes.ok || !usersActiveRes.ok || !paymentsRecentRes.ok) {
                    throw new Error('Error cargando datos')
                }

                const usersCount: UsersResponse = await usersCountRes.json()
                const usersRecent: UsersResponse = await usersRecentRes.json()
                const usersActive: UsersResponse = await usersActiveRes.json()
                const paymentsRecent: PaymentsResponse = await paymentsRecentRes.json()

                setTotalUsers(usersCount.totalDocs || 0)
                setActiveMembers(usersActive.totalDocs || 0)
                setRecentUsers(
                    (usersRecent.docs || []).map((d) => ({ createdAt: d.createdAt })).filter(Boolean),
                )
                setPayments30(
                    (paymentsRecent.docs || []).map((d) => ({
                        createdAt: d.createdAt,
                        amount: typeof d.amount === 'number' ? d.amount : 0,
                    })),
                )
                setError(null)
            } catch (e) {
                const msg = e instanceof Error ? e.message : String(e)
                setError(msg)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        load()
        return () => {
            isMounted = false
        }
    }, [])

    const usersSeries = useMemo(() => {
        // Serie de últimos 14 días
        const days = 14
        const today = startOfDay(new Date())
        const buckets: { label: string; date: Date; count: number }[] = []
        for (let i = days - 1; i >= 0; i -= 1) {
            const d = subDays(today, i)
            buckets.push({ label: d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }), date: d, count: 0 })
        }

        for (const u of recentUsers) {
            const d = startOfDay(new Date(u.createdAt))
            const key = d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })
            const bucket = buckets.find((b) => b.label === key)
            if (bucket) bucket.count += 1
        }
        return buckets
    }, [recentUsers])

    const paymentsTotal30 = useMemo(() => payments30.reduce((acc, p) => acc + (p.amount || 0), 0), [payments30])

    const maxUsers = Math.max(5, ...usersSeries.map((b) => b.count))

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <Card className="bg-neutral-950 border-neutral-800">
                    <CardHeader className="pb-2">
                        <CardDescription>Usuarios totales</CardDescription>
                        <CardTitle className="text-3xl">{loading ? '—' : formatNumber(totalUsers)}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="bg-neutral-950 border-neutral-800">
                    <CardHeader className="pb-2">
                        <CardDescription>Miembros activos</CardDescription>
                        <CardTitle className="text-3xl">{loading ? '—' : formatNumber(activeMembers)}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="bg-neutral-950 border-neutral-800">
                    <CardHeader className="pb-2">
                        <CardDescription>Nuevos últimos 14 días</CardDescription>
                        <CardTitle className="text-3xl">{loading ? '—' : formatNumber(recentUsers.length)}</CardTitle>
                    </CardHeader>
                </Card>
                <Card className="bg-neutral-950 border-neutral-800">
                    <CardHeader className="pb-2">
                        <CardDescription>Ingresos 30 días (EUR)</CardDescription>
                        <CardTitle className="text-3xl">{loading ? '—' : formatNumber(Math.round(paymentsTotal30))}</CardTitle>
                    </CardHeader>
                </Card>
            </div>

            <Card className="bg-neutral-950 border-neutral-800">
                <CardHeader className="pb-0">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base">Altas de usuarios (14 días)</CardTitle>
                        {error && <span className="text-xs text-red-400">{error}</span>}
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Mini bar chart sin librerías */}
                    <div className="relative">
                        {/* Fondo cuadriculado sutil */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24px_24px] rounded-md" aria-hidden />
                        <div className="flex items-end gap-1 h-36 relative p-2">
                            {usersSeries.map((b) => {
                                const heightPct = maxUsers === 0 ? 0 : Math.round((b.count / maxUsers) * 100)
                                return (
                                    <div key={b.label} className="flex-1 flex flex-col items-center">
                                        <div
                                            className="w-full rounded-sm bg-gradient-to-t from-blue-600/80 to-blue-400/70"
                                            style={{ height: `${heightPct}%`, minHeight: 2 }}
                                            title={`${b.label}: ${b.count}`}
                                        />
                                        <div className="text-[10px] text-neutral-400 mt-1">{b.label}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminDashboard


