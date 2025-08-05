# Apps

Este directorio contiene las aplicaciones principales del monorepo.

## 📁 Estructura

### `web/`
- **Descripción**: Frontend de la aplicación construido con Next.js 14
- **Tecnologías**: Next.js, React, TailwindCSS, Auth.js
- **Puerto**: 3000
- **Comando**: `pnpm dev:web`

### `cms/`
- **Descripción**: Backend API y panel de administración con Payload CMS
- **Tecnologías**: Payload CMS, Express, Node.js
- **Puerto**: 3001
- **Comando**: `pnpm dev:cms`

## 🚀 Desarrollo

```bash
# Ambas aplicaciones
pnpm dev

# Solo frontend
pnpm dev --filter=web

# Solo CMS
pnpm dev --filter=cms
```

## 📦 Dependencias Compartidas

Ambas aplicaciones utilizan los paquetes compartidos de `packages/`:
- `@repo/ui` - Componentes de interfaz
- `@repo/db` - Cliente de base de datos
- `@repo/config` - Configuración compartida
- `@repo/utils` - Funciones utilitarias