# Packages

Paquetes compartidos entre las aplicaciones del monorepo.

## 📁 Estructura

### `ui/`
- **Descripción**: Componentes de interfaz de usuario reutilizables
- **Tecnologías**: React, TypeScript, TailwindCSS
- **Exports**: Button, Card, Input, Layout, etc.

### `db/`
- **Descripción**: Schema de base de datos y cliente Prisma
- **Tecnologías**: Prisma, PostgreSQL
- **Exports**: Cliente Prisma, tipos generados

### `config/`
- **Descripción**: Configuración compartida y esquemas de validación
- **Tecnologías**: Zod para validación
- **Exports**: Esquemas de env, rutas API, configuración de app

### `utils/`
- **Descripción**: Funciones utilitarias compartidas
- **Tecnologías**: TypeScript
- **Exports**: Helpers para formateo, validación, etc.

## 🔧 Uso

```typescript
// En cualquier app o package
import { Button } from '@repo/ui';
import { prisma } from '@repo/db';
import { validateEnv } from '@repo/config';
import { formatDate } from '@repo/utils';
```

## 📦 Build

Cada package se construye independientemente:

```bash
# Build todos los packages
pnpm build

# Build específico
pnpm build --filter=@repo/ui
```