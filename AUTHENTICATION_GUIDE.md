# 🔐 Guía de Autenticación y Protección de Rutas - BMR

Esta guía explica cómo funciona el sistema de autenticación y protección de rutas implementado en la aplicación BMR.

## 📋 Resumen del Sistema

El sistema implementa protección de rutas basada en:
- **Autenticación**: Usuario logueado con token válido
- **Membresía Activa**: Usuario con membresía activa (`membershipStatus: 'active'`)
- **Tipos de Membresía**: `monthly`, `quarterly`, `annual` (no `none`)

## 🔧 Componentes Principales

### 1. Utilidades de Membresía (`src/utilities/membership.ts`)

```typescript
// Verificar si tiene membresía activa
hasActiveMembership(user)

// Verificar si está autenticado
isAuthenticated(user)

// Obtener información completa
getMembershipInfo(user)

// Tipos de protección
enum RouteProtection {
  PUBLIC = 'public',
  AUTHENTICATED = 'authenticated', 
  MEMBERSHIP = 'membership',
  ADMIN = 'admin'
}
```

### 2. Middleware de Protección (`middleware.ts`)

Protege automáticamente las rutas definidas:

**Rutas que requieren membresía:**
- `/perfil`
- `/herramientas-de-regulacion`
- `/rutina-de-enfoque-diario`
- `/respiraciones-conscientes`
- `/transformacion-nocturna`
- `/reto-21-dias`
- `/home-app`

**Rutas que solo requieren autenticación:**
- `/pago-de-membresia`

**Rutas públicas:**
- `/`, `/login`, `/blog`, `/contacto`, `/niveles-de-membresia`, etc.

### 3. Componente ProtectedRoute (`src/components/ProtectedRoute/index.tsx`)

```tsx
import ProtectedRoute, { useAuth } from '@/components/ProtectedRoute'
import { RouteProtection } from '@/utilities/membership'

// Proteger una página completa
export default function MyPage() {
  return (
    <ProtectedRoute protection={RouteProtection.MEMBERSHIP}>
      <MyContent />
    </ProtectedRoute>
  )
}

// Usar el hook en un componente
function MyComponent() {
  const { user, loading, isAuthenticated, hasActiveMembership } = useAuth()
  
  if (loading) return <div>Cargando...</div>
  if (!hasActiveMembership) return <div>Membresía requerida</div>
  
  return <div>Contenido protegido</div>
}
```

### 4. Verificación del Servidor (`src/utilities/serverAuth.ts`)

```typescript
// En una página de Next.js (Server Component)
import { getMeUserWithMembership } from '@/utilities/serverAuth'

async function verifyAccess() {
  await getMeUserWithMembership({
    protection: RouteProtection.MEMBERSHIP
  })
}
```

### 5. Verificación del Cliente (`src/utilities/getMeUserWithMembership.ts`)

```typescript
// En un componente del cliente
import { getUserFromClient } from '@/utilities/getMeUserWithMembership'

const user = await getUserFromClient()
```

## 🎨 Componentes de UI

### MembershipRequired / LoginRequired

Componentes que se muestran automáticamente cuando no se cumple el acceso:

```tsx
import MembershipRequired, { LoginRequired } from '@/components/MembershipRequired'

// Se muestran automáticamente por ProtectedRoute
// O se pueden usar manualmente:
return <MembershipRequired 
  title="Acceso Premium Requerido"
  description="Este contenido requiere membresía activa"
  redirectTo="/niveles-de-membresia"
/>
```

## 🚀 Cómo Usar en Páginas

### Página que Requiere Membresía

```tsx
import { getMeUserWithMembership } from '@/utilities/serverAuth'
import { RouteProtection } from '@/utilities/membership'
import ProtectedRoute from '@/components/ProtectedRoute'

// Verificación del servidor (opcional)
async function verifyAccess() {
  await getMeUserWithMembership({
    protection: RouteProtection.MEMBERSHIP
  })
}

function MyPageContent() {
  // Tu contenido aquí
  return <div>Contenido protegido</div>
}

export default function MyPage() {
  return (
    <ProtectedRoute protection={RouteProtection.MEMBERSHIP}>
      <MyPageContent />
    </ProtectedRoute>
  )
}
```

### Página que Solo Requiere Autenticación

```tsx
export default function MyPage() {
  return (
    <ProtectedRoute protection={RouteProtection.AUTHENTICATED}>
      <MyPageContent />
    </ProtectedRoute>
  )
}
```

### Página Pública

```tsx
export default function MyPage() {
  return (
    <ProtectedRoute protection={RouteProtection.PUBLIC}>
      <MyPageContent />
    </ProtectedRoute>
  )
}

// O simplemente sin ProtectedRoute
export default function MyPage() {
  return <MyPageContent />
}
```

## 🔄 Flujo de Autenticación

1. **Usuario accede a ruta protegida**
2. **Middleware verifica token**
   - Sin token → Redirige a `/login`
   - Con token → Continúa
3. **ProtectedRoute verifica permisos**
   - Sin autenticación → Muestra `LoginRequired`
   - Sin membresía → Muestra `MembershipRequired`
   - Todo OK → Muestra contenido

## 📱 Panel de Administración

- **URL**: `http://localhost:3000/admin` (desarrollo)
- **URL**: `https://tudominio.com/admin` (producción)
- **Acceso**: No requiere membresía, usa sistema auth de Payload

## 🔧 Estados de Membresía

```typescript
interface User {
  membershipType: 'none' | 'monthly' | 'quarterly' | 'annual'
  membershipStatus: 'inactive' | 'active' | 'cancelled' | 'pending'
  membershipStartDate?: string
  membershipEndDate?: string
  stripeCustomerId?: string
  stripeSubscriptionId?: string
}
```

### Para tener acceso completo:
- `membershipType` ≠ `'none'`
- `membershipStatus` = `'active'`
- `membershipEndDate` > fecha actual (si existe)

## 🎯 Configuración de Rutas

Para agregar nuevas rutas protegidas, actualiza:

1. **middleware.ts** - Agrega la ruta al array correspondiente
2. **Crea la página** - Usa `ProtectedRoute` con la protección adecuada

## 🚨 Troubleshooting

### Usuario no puede acceder aunque tenga membresía:
1. Verificar `membershipStatus` = `'active'`
2. Verificar `membershipType` ≠ `'none'`
3. Verificar `membershipEndDate` (si existe)
4. Verificar token válido en cookies

### Redirecciones no funcionan:
1. Verificar middleware.ts
2. Verificar configuración de rutas
3. Verificar que el token esté en las cookies

### Panel admin no accesible:
- URL correcta: `/admin` (no `/administrator` o similar)
- Crear usuario admin si no existe
- Verificar configuración de Payload

## 🔄 Logout

```tsx
const handleLogout = async () => {
  // Limpiar cookie
  document.cookie = 'payload-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  // Redireccionar
  router.push('/login')
}
```

## 📊 Estados de Usuario en UI

El componente de perfil ahora muestra dinámicamente:
- Nombre real del usuario
- Fecha de registro
- Tipo de membresía actual
- Estado de membresía con colores
- Fecha de vencimiento (si aplica)
- Funcionalidad de logout

Este sistema proporciona una experiencia fluida y segura para manejar contenido premium en la aplicación BMR.