# Sistema de Membresías BMR - Flujo Completo

## Resumen

Se ha implementado un sistema completo de registro y pago de membresías integrado con Stripe para la plataforma BMR (Begoña Mental Reset).

## Características Implementadas

### ✅ Modelo de Usuario Actualizado
- Campos de membresía añadidos al modelo de usuario en Payload CMS
- Soporte para diferentes tipos y estados de membresía
- Integración con datos de Stripe (customer ID, subscription ID)

### ✅ Formulario de Registro Completo
- Validación robusta de datos del usuario
- Interfaz moderna y responsive
- Integración con términos y condiciones
- Manejo de errores y estados de carga

### ✅ Integración con Stripe
- Creación automática de sesiones de checkout
- Soporte para suscripciones recurrentes
- Manejo seguro de webhooks
- Precios dinámicos configurables

### ✅ Flujo de Pago Completo
- Selección de plan → Registro → Pago → Activación
- Páginas de éxito y cancelación
- Redirecciones automáticas

## Archivos Creados/Modificados

### Backend (API Routes)
- `src/app/(payload)/api/stripe/create-checkout-session/route.ts` - Crear sesiones de pago
- `src/app/(payload)/api/stripe/webhook/route.ts` - Manejar eventos de Stripe
- `src/app/(payload)/api/auth/register/route.ts` - Registro de usuarios

### Frontend (Componentes)
- `src/domains/membership/components/MembershipRegistrationForm.tsx` - Formulario de registro
- `src/app/(frontend)/pago-de-membresia/PagoMembresiaClient.tsx` - Cliente de página de pago
- `src/app/(frontend)/pago-de-membresia/page.tsx` - Página de pago actualizada

### Configuración
- `src/collections/Users/index.ts` - Modelo de usuario actualizado
- `src/domains/landing/components/LandingMembresiasPage.tsx` - Landing actualizada
- `src/lib/stripe.ts` - Cliente de Stripe
- `STRIPE_SETUP.md` - Documentación de configuración
- `MEMBERSHIP_FLOW.md` - Este archivo

## Flujo de Usuario

### 1. Selección de Plan
- Usuario visita `/niveles-de-membresia`
- Ve los tres planes disponibles (Mensual, Trimestral, Anual)
- Hace clic en "Seleccionar Plan"

### 2. Registro
- Redirigido a `/pago-de-membresia?type=monthly` (ejemplo)
- Completa el formulario con:
  - Nombre completo
  - Email
  - Contraseña (con validación)
  - Aceptación de términos y privacidad

### 3. Procesamiento
- Se crea el usuario en Payload CMS (si no existe)
- Se genera una sesión de Stripe Checkout
- Usuario es redirigido a Stripe

### 4. Pago
- Usuario completa el pago en Stripe
- Stripe procesa la suscripción recurrente

### 5. Confirmación
- Webhook de Stripe notifica el pago exitoso
- Usuario es actualizado con membresía activa
- Redirigido a `/perfil?success=true`

## Tipos de Membresía

| Tipo | Precio | Frecuencia | Descripción |
|------|--------|------------|-------------|
| Mensual | €14.97 | Cada mes | Perfecto para comenzar |
| Trimestral | €37.97 | Cada 3 meses | Más popular, ahorro de €6 |
| Anual | €127.97 | Cada año | Mejor inversión |

## Estados de Membresía

- **inactive**: Sin membresía activa
- **pending**: Pago en proceso
- **active**: Membresía activa
- **cancelled**: Membresía cancelada

## Variables de Entorno Requeridas

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

## Eventos de Stripe Manejados

- `checkout.session.completed` - Checkout completado
- `customer.subscription.created` - Suscripción creada
- `customer.subscription.updated` - Suscripción actualizada
- `customer.subscription.deleted` - Suscripción cancelada
- `invoice.payment_succeeded` - Pago exitoso
- `invoice.payment_failed` - Pago fallido

## URLs Importantes

- **Selección**: `/niveles-de-membresia`
- **Registro/Pago**: `/pago-de-membresia?type={tipo}`
- **Éxito**: `/perfil?success=true`
- **Cancelado**: `/pago-de-membresia?cancelled=true`
- **Webhook**: `/api/stripe/webhook`

## Seguridad Implementada

- ✅ Validación de webhooks con firma de Stripe
- ✅ Sanitización de datos de entrada
- ✅ Manejo seguro de contraseñas
- ✅ Variables de entorno para claves secretas
- ✅ Validación de permisos en Payload CMS

## Próximos Pasos Sugeridos

1. **Testing**: Probar el flujo completo en desarrollo
2. **Producción**: Configurar webhooks en Stripe producción
3. **Notificaciones**: Añadir emails de confirmación
4. **Panel de Usuario**: Crear página de gestión de suscripción
5. **Cancelación**: Implementar cancelación de suscripciones
6. **Facturación**: Añadir descarga de facturas
7. **Cupones**: Implementar códigos de descuento

## Troubleshooting

### Error: "Cannot read properties of null"
- Verificar que todas las variables de entorno estén configuradas

### Webhook no funciona
- Verificar que la URL del webhook sea accesible
- Comprobar que el secret del webhook sea correcto

### Usuario no se activa después del pago
- Revisar los logs del webhook
- Verificar que los eventos estén configurados en Stripe

### Error de CORS
- Verificar que el dominio esté en la lista de dominios permitidos en Stripe

## Soporte

Para problemas o dudas sobre la implementación, revisar:
1. Los logs de la consola del navegador
2. Los logs del servidor Next.js
3. Los logs del webhook en Stripe Dashboard
4. La documentación de Stripe: https://stripe.com/docs