import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import config from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-07-30.basil',
})

export async function POST(req: NextRequest) {
    try {
        const payload = await getPayload({ config })
        const { membershipType, email, name, userId } = await req.json()

        // Validar datos requeridos
        if (!membershipType || !email || !name) {
            return NextResponse.json(
                { error: 'Datos faltantes: membershipType, email y name son requeridos' },
                { status: 400 }
            )
        }

        // Definir precios según el tipo de membresía
        const membershipPrices = {
            monthly: {
                price: 1497, // 14.97€ en centavos
                interval: 'month' as const,
                intervalCount: 1,
                name: 'Membresía Mensual BMR',
            },
            quarterly: {
                price: 3797, // 37.97€ en centavos
                interval: 'month' as const,
                intervalCount: 3,
                name: 'Membresía Trimestral BMR',
            },
            annual: {
                price: 12797, // 127.97€ en centavos
                interval: 'year' as const,
                intervalCount: 1,
                name: 'Membresía Anual BMR',
            },
        }

        const membershipConfig = membershipPrices[membershipType as keyof typeof membershipPrices]
        if (!membershipConfig) {
            return NextResponse.json(
                { error: 'Tipo de membresía no válido' },
                { status: 400 }
            )
        }

        // Verificar si el usuario ya existe
        const existingUser = await payload.find({
            collection: 'users',
            where: {
                email: {
                    equals: email,
                },
            },
        })

        let stripeCustomerId: string | undefined

        if (existingUser.docs.length > 0) {
            stripeCustomerId = existingUser.docs[0].stripeCustomerId || undefined
        }

        // Crear o recuperar cliente de Stripe
        if (!stripeCustomerId) {
            const customer = await stripe.customers.create({
                email,
                name,
                metadata: {
                    membershipType,
                },
            })
            stripeCustomerId = customer.id
        }

        // Crear sesión de checkout
        const session = await stripe.checkout.sessions.create({
            customer: stripeCustomerId,
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: membershipConfig.name,
                            description: `Acceso completo a la plataforma BMR - ${membershipConfig.name}`,
                        },
                        unit_amount: membershipConfig.price,
                        recurring: {
                            interval: membershipConfig.interval,
                            interval_count: membershipConfig.intervalCount,
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/perfil?success=true&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/pago-de-membresia?cancelled=true`,
            metadata: {
                membershipType,
                email,
                name,
                userId: userId || (existingUser.docs.length > 0 ? existingUser.docs[0].id.toString() : ''),
            },
        })

        return NextResponse.json({ sessionId: session.id, url: session.url })
    } catch (error) {
        console.error('Error creando sesión de checkout:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}