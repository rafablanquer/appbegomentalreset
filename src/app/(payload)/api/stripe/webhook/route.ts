import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getPayload } from 'payload'
import config from '@payload-config'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-07-30.basil',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
    try {
        const payload = await getPayload({ config })
        const body = await req.text()
        const sig = req.headers.get('stripe-signature')!

        let event: Stripe.Event

        try {
            event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
        } catch (err) {
            console.error('Error verificando webhook:', err)
            return NextResponse.json({ error: 'Error verificando webhook' }, { status: 400 })
        }

        // Manejar diferentes tipos de eventos
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session
                await handleCheckoutCompleted(session, payload)
                break
            }
            case 'customer.subscription.created': {
                const subscription = event.data.object as Stripe.Subscription
                await handleSubscriptionCreated(subscription, payload)
                break
            }
            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription
                await handleSubscriptionUpdated(subscription, payload)
                break
            }
            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription
                await handleSubscriptionDeleted(subscription, payload)
                break
            }
            case 'invoice.payment_succeeded': {
                const invoice = event.data.object as Stripe.Invoice
                await handlePaymentSucceeded(invoice, payload)
                break
            }
            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice
                await handlePaymentFailed(invoice, payload)
                break
            }
            default:
                console.log(`Evento no manejado: ${event.type}`)
        }

        return NextResponse.json({ received: true })
    } catch (error) {
        console.error('Error procesando webhook:', error)
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
    }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session, payload: any) {
    if (!session.metadata) return

    const { email, name, membershipType, userId } = session.metadata

    try {
        let user
        if (userId) {
            // Actualizar usuario existente
            user = await payload.update({
                collection: 'users',
                id: userId,
                data: {
                    stripeCustomerId: session.customer as string,
                    membershipType,
                    membershipStatus: 'active',
                    membershipStartDate: new Date().toISOString(),
                },
            })
        } else {
            // Crear nuevo usuario
            user = await payload.create({
                collection: 'users',
                data: {
                    email,
                    name,
                    stripeCustomerId: session.customer as string,
                    membershipType,
                    membershipStatus: 'pending', // Se activará cuando se confirme la suscripción
                    membershipStartDate: new Date().toISOString(),
                },
            })
        }

        console.log('Usuario actualizado/creado después del checkout:', user.id)
    } catch (error) {
        console.error('Error manejando checkout completado:', error)
    }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription, payload: any) {
    try {
        const customerId = subscription.customer as string

        // Buscar usuario por stripeCustomerId
        const users = await payload.find({
            collection: 'users',
            where: {
                stripeCustomerId: {
                    equals: customerId,
                },
            },
        })

        if (users.docs.length > 0) {
            const user = users.docs[0]

            // Calcular fecha de fin basada en el tipo de suscripción
            const subscriptionData = subscription as any
            const startDate = new Date((subscriptionData.current_period_start || Math.floor(Date.now() / 1000)) * 1000)
            const endDate = new Date((subscriptionData.current_period_end || Math.floor(Date.now() / 1000) + 2592000) * 1000) // +30 días por defecto

            await payload.update({
                collection: 'users',
                id: user.id,
                data: {
                    stripeSubscriptionId: subscription.id,
                    membershipStatus: 'active',
                    membershipStartDate: startDate.toISOString(),
                    membershipEndDate: endDate.toISOString(),
                },
            })

            console.log('Suscripción activada para usuario:', user.id)
        }
    } catch (error) {
        console.error('Error manejando suscripción creada:', error)
    }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription, payload: any) {
    try {
        const customerId = subscription.customer as string

        const users = await payload.find({
            collection: 'users',
            where: {
                stripeCustomerId: {
                    equals: customerId,
                },
            },
        })

        if (users.docs.length > 0) {
            const user = users.docs[0]
            const subscriptionData = subscription as any
            const endDate = new Date((subscriptionData.current_period_end || Math.floor(Date.now() / 1000) + 2592000) * 1000) // +30 días por defecto

            const status = subscription.status === 'active' ? 'active' :
                subscription.status === 'canceled' ? 'cancelled' :
                    subscription.status === 'past_due' ? 'inactive' : 'pending'

            await payload.update({
                collection: 'users',
                id: user.id,
                data: {
                    membershipStatus: status,
                    membershipEndDate: endDate.toISOString(),
                },
            })

            console.log('Suscripción actualizada para usuario:', user.id)
        }
    } catch (error) {
        console.error('Error manejando suscripción actualizada:', error)
    }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription, payload: any) {
    try {
        const customerId = subscription.customer as string

        const users = await payload.find({
            collection: 'users',
            where: {
                stripeCustomerId: {
                    equals: customerId,
                },
            },
        })

        if (users.docs.length > 0) {
            const user = users.docs[0]

            await payload.update({
                collection: 'users',
                id: user.id,
                data: {
                    membershipStatus: 'cancelled',
                    membershipEndDate: new Date().toISOString(),
                },
            })

            console.log('Suscripción cancelada para usuario:', user.id)
        }
    } catch (error) {
        console.error('Error manejando suscripción eliminada:', error)
    }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice, payload: any) {
    try {
        const customerId = invoice.customer as string

        const users = await payload.find({
            collection: 'users',
            where: {
                stripeCustomerId: {
                    equals: customerId,
                },
            },
        })

        if (users.docs.length > 0) {
            const user = users.docs[0]

            // Renovar la membresía
            const invoiceData = invoice as any
            if (invoiceData.subscription) {
                const subscription = await stripe.subscriptions.retrieve(invoiceData.subscription as string)
                const subscriptionData = subscription as any
                const endDate = new Date((subscriptionData.current_period_end || Math.floor(Date.now() / 1000) + 2592000) * 1000) // +30 días por defecto

                await payload.update({
                    collection: 'users',
                    id: user.id,
                    data: {
                        membershipStatus: 'active',
                        membershipEndDate: endDate.toISOString(),
                    },
                })
            }

            console.log('Pago exitoso para usuario:', user.id)
        }
    } catch (error) {
        console.error('Error manejando pago exitoso:', error)
    }
}

async function handlePaymentFailed(invoice: Stripe.Invoice, payload: any) {
    try {
        const customerId = invoice.customer as string

        const users = await payload.find({
            collection: 'users',
            where: {
                stripeCustomerId: {
                    equals: customerId,
                },
            },
        })

        if (users.docs.length > 0) {
            const user = users.docs[0]

            await payload.update({
                collection: 'users',
                id: user.id,
                data: {
                    membershipStatus: 'inactive',
                },
            })

            console.log('Pago fallido para usuario:', user.id)
        }
    } catch (error) {
        console.error('Error manejando pago fallido:', error)
    }
}