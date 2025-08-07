import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(req: NextRequest) {
    try {
        const payload = await getPayload({ config })
        const { email, password, name } = await req.json()

        // Validar datos requeridos
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: 'Email, password y name son requeridos' },
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

        if (existingUser.docs.length > 0) {
            return NextResponse.json(
                { error: 'Ya existe un usuario con este email' },
                { status: 400 }
            )
        }

        // Crear el usuario
        const user = await payload.create({
            collection: 'users',
            data: {
                email,
                password,
                name,
                membershipType: 'none',
                membershipStatus: 'inactive',
            },
        })

        // Devolver datos del usuario (sin la contraseña)
        const { password: _, ...userWithoutPassword } = user

        return NextResponse.json({
            success: true,
            user: userWithoutPassword,
        })
    } catch (error) {
        console.error('Error creando usuario:', error)
        return NextResponse.json(
            { error: 'Error interno del servidor' },
            { status: 500 }
        )
    }
}