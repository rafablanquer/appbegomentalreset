# App Bego Mental Reset

Monorepo para la aplicación de bienestar mental construido con Turborepo, Next.js y Payload CMS.

## 🏗️ Estructura del Proyecto

```
/appbegomentalreset
│
├── apps/
│   ├── web/          # Frontend Next.js (SSR, App Router, Auth.js)
│   └── cms/          # Payload CMS (API + admin)
│
├── packages/
│   ├── ui/           # Componentes compartidos (botones, layouts...)
│   ├── config/       # Configuración compartida (env schema, rutas API)
│   ├── db/           # Prisma schema + cliente (compartido por web y cms)
│   └── utils/        # Funciones helper
│
├── infra/            # Configuración de despliegue y orquestación
│   ├── vercel/       # vercel.json y settings para deploy
│   ├── docker/       # Dockerfiles multi-stage (cms y/o web)
│   └── terraform/    # Scripts IaC para Fly.io, AWS, Railway, etc.
│
├── .env              # Variables de entorno local (NO subir a repo)
├── turbo.json        # Configuración Turborepo (build cache, tasks)
├── package.json      # Scripts raíz
└── README.md
```

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js >=18.0.0
- pnpm >=8.0.0

### Instalación

```bash
# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tus valores
```

### Desarrollo

```bash
# Levantar toda la aplicación
pnpm dev

# Solo frontend
pnpm dev:web

# Solo CMS
pnpm dev:cms
```

### Build

```bash
# Build completo del monorepo
pnpm build

# Build específico
pnpm build:web
pnpm build:cms
```

## 📦 Paquetes

### `apps/web`
Frontend con Next.js 14, App Router, Auth.js y TailwindCSS.

### `apps/cms`
Backend API y panel de administración con Payload CMS.

### `packages/ui`
Componentes de UI reutilizables entre aplicaciones.

### `packages/db`
Schema de Prisma y cliente de base de datos compartido.

### `packages/config`
Configuración compartida: schemas de env, constantes, etc.

### `packages/utils`
Funciones utilitarias compartidas.

## 🚢 Despliegue

### Vercel (Web)
```bash
# El frontend se despliega automáticamente desde apps/web
vercel --prod
```

### Docker (CMS)
```bash
# Build y deploy del CMS
docker build -f infra/docker/Dockerfile.cms -t cms .
docker run -p 3001:3001 cms
```

### Terraform
Scripts de infraestructura como código en `infra/terraform/` para diferentes proveedores.

## 🛠️ Tecnologías

- **Monorepo**: Turborepo
- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Payload CMS, Node.js
- **Base de datos**: PostgreSQL con Prisma
- **Autenticación**: Auth.js (NextAuth)
- **Despliegue**: Vercel, Docker, Terraform
- **Package Manager**: pnpm

## 📝 Licencia

MIT