// Re-exportar el cliente de Prisma
export { PrismaClient } from '@prisma/client';

// Cliente singleton para desarrollo
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Tipos generados por Prisma
export type * from '@prisma/client';