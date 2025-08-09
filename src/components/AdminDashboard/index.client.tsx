"use client"

import React, { useEffect, useMemo, useState } from 'react'

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
        <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div className={cardClass}>
                    <div className="text-neutral-400 text-xs mb-1">Usuarios totales</div>
                    <div className="text-2xl font-semibold">{loading ? '—' : formatNumber(totalUsers)}</div>
                </div>
                <div className={cardClass}>
                    <div className="text-neutral-400 text-xs mb-1">Miembros activos</div>
                    <div className="text-2xl font-semibold">{loading ? '—' : formatNumber(activeMembers)}</div>
                </div>
                <div className={cardClass}>
                    <div className="text-neutral-400 text-xs mb-1">Nuevos últimos 14 días</div>
                    <div className="text-2xl font-semibold">{loading ? '—' : formatNumber(recentUsers.length)}</div>
                </div>
                <div className={cardClass}>
                    <div className="text-neutral-400 text-xs mb-1">Ingresos 30 días (EUR)</div>
                    <div className="text-2xl font-semibold">{loading ? '—' : formatNumber(Math.round(paymentsTotal30))}</div>
                </div>
            </div>

            <div className={cardClass}>
                <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-semibold">Altas de usuarios (14 días)</div>
                    {error && <div className="text-xs text-red-400">{error}</div>}
                </div>
                {/* Mini bar chart sin librerías */}
                <div className="flex items-end gap-1 h-28">
                    {usersSeries.map((b) => {
                        const h = maxUsers === 0 ? 0 : Math.round((b.count / maxUsers) * 100)
                        return (
                            <div key={b.label} className="flex-1">
                                <div
                                    className="w-full rounded-sm bg-blue-500/70"
                                    style={{ height: `${h}%`, minHeight: 2 }}
                                    title={`${b.label}: ${b.count}`}
                                />
                                <div className="text-[10px] text-neutral-400 text-center mt-1">{b.label}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard


