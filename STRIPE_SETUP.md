# Configuración de Stripe para BMR

## Variables de Entorno Requeridas

Añade las siguientes variables a tu archivo `.env`:

```bash
# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here  
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret_here
```

## Configuración en Stripe Dashboard

### 1. Obtener las Claves de API

1. Inicia sesión en tu [Stripe Dashboard](https://dashboard.stripe.com)
2. Ve a **Developers > API keys**
3. Copia la **Secret key** (comienza con `sk_test_`) para `STRIPE_SECRET_KEY`
4. Copia la **Publishable key** (comienza con `pk_test_`) para `STRIPE_PUBLISHABLE_KEY`

### 2. Configurar Webhooks

1. En el Stripe Dashboard, ve a **Developers > Webhooks**
2. Haz clic en **Add endpoint**
3. Añade la URL: `https://tu-dominio.com/api/stripe/webhook` (o `http://localhost:3000/api/stripe/webhook` para desarrollo)
4. Selecciona los siguientes eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Guarda el endpoint y copia el **Signing secret** para `STRIPE_WEBHOOK_SECRET`

## Productos y Precios en Stripe

### Opción 1: Crear Precios Manualmente (Recomendado)

1. Ve a **Products** en el Stripe Dashboard
2. Crea un producto llamado "BMR Membership"
3. Añade tres precios:
   - **Mensual**: €14.97 cada mes
   - **Trimestral**: €37.97 cada 3 meses
   - **Anual**: €127.97 cada año

### Opción 2: Los Precios se Crean Automáticamente

El código actual crea los precios dinámicamente en cada checkout. Esto funciona pero es menos eficiente.

## Flujo de Pago

1. **Selección de Plan**: Usuario elige un plan en `/niveles-de-membresia`
2. **Registro**: Usuario completa el formulario en `/pago-de-membresia?type=monthly`
3. **Checkout**: Se crea una sesión de Stripe Checkout
4. **Pago**: Usuario completa el pago en Stripe
5. **Webhook**: Stripe notifica el pago exitoso
6. **Activación**: El usuario se crea/actualiza con la membresía activa

## URLs Importantes

- **Página de membresías**: `/niveles-de-membresia`
- **Página de pago**: `/pago-de-membresia`
- **API Checkout**: `/api/stripe/create-checkout-session`
- **Webhook**: `/api/stripe/webhook`
- **Éxito**: `/perfil?success=true`
- **Cancelación**: `/pago-de-membresia?cancelled=true`

## Desarrollo Local

Para probar webhooks en desarrollo local, usa ngrok:

```bash
# Instalar ngrok
npm install -g ngrok

# Exponer puerto 3000
ngrok http 3000

# Usar la URL de ngrok para el webhook en Stripe
# Ejemplo: https://abc123.ngrok.io/api/stripe/webhook
```

## Seguridad

- ✅ Las claves secretas están en variables de entorno
- ✅ Los webhooks se verifican con la firma de Stripe
- ✅ Los precios se definen en el servidor (no en el cliente)
- ✅ Los datos de usuario se almacenan de forma segura en Payload CMS

## Modelo de Usuario Actualizado

El modelo de usuario ahora incluye:

- `membershipType`: 'none' | 'monthly' | 'quarterly' | 'annual'
- `membershipStatus`: 'inactive' | 'active' | 'cancelled' | 'pending'
- `stripeCustomerId`: ID del cliente en Stripe
- `stripeSubscriptionId`: ID de la suscripción en Stripe
- `membershipStartDate`: Fecha de inicio de la membresía
- `membershipEndDate`: Fecha de fin de la membresía

## Próximos Pasos

1. Configurar las variables de entorno
2. Probar el flujo completo en desarrollo
3. Configurar los webhooks en producción
4. Añadir manejo de errores adicional
5. Implementar cancelación de suscripciones
6. Añadir notificaciones por email