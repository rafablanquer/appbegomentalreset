## Panel de Administración (Payload) – Guía para gestores

Este documento describe cómo administrar el contenido y la parte de negocio del SaaS (BMR) desde el panel de Payload.

### Acceso
- URL del panel: `/admin`
- Recomendado: crear cuentas separadas para el equipo (Propietario, Gestores, Miembros).

### Roles y permisos
- **Propietario (`owner`)**: acceso total.
- **Gestor (`manager`)**: gestionar contenido y usuarios, revisar pagos; no tocar configuración técnica.
- **Miembro (`member`)**: acceso a la PWA (no al panel). En `users.roles` siempre viene por defecto `member`.

### Colecciones principales (contenido del SaaS)
- **Programas** (`programs`): título, descripción rich text, imagen y lista de audios.
  - Campos de audio por ítem: `title`, `description`, `audio` (subida a `media`), `externalUrl` (opcional) y `durationSeconds`.
- **Colecciones de contenido** (`content-collections`): lista de ítems flexibles para videos y enlaces.
  - Por ítem: `title`, `intro`, `video` (upload), `youtubeUrl`, `externalUrl`.
- **Retos** (`challenges`): estructura día a día con contenidos.
  - Por día: `dayNumber`, `title`, `note`, `audio` (upload), `video` (upload), `youtubeUrl`, `externalUrl`.
- **Medios** (`media`): biblioteca de imágenes, audios y videos.

### Blog y páginas
- **Posts** (`posts`) y **Categorías** (`categories`): blog con SEO, hero, contenido rich text y relaciones.
- **Páginas** (`pages`): páginas de contenido con bloques (CTA, Media, Form, Archive, etc.).

### Membresías y pagos
- **Usuarios** (`users`):
  - Campos clave: `membershipType` (`none|monthly|quarterly|annual`), `membershipStatus` (`inactive|pending|active|cancelled`), `membershipStartDate`, `membershipEndDate`, `stripeCustomerId`, `stripeSubscriptionId`, `roles`.
  - Búsqueda habitual: filtrar por `membershipStatus = active` o por `stripeCustomerId`.
- **Pagos de membresía** (`membership-payments`): histórico de cobros que llega desde Stripe webhook.
  - Campos: `user`, `stripeInvoiceId`, `stripeSubscriptionId`, `amount`, `currency`, `status`, `periodStart`, `periodEnd`, `raw`.
  - Úsalo para auditoría; no modificar manualmente.

### Flujos de trabajo recomendados
- **Crear un Programa**
  1) Ir a `/admin/collections/programs` → “Create New”.
  2) Rellenar `title`, `description`, `image`.
  3) En `audios` añadir cada audio con su título, archivo y descripción.
  4) Guardar como borrador o Publicar.

- **Crear una Colección de contenido**
  1) Ir a `/admin/collections/content-collections` → “Create New”.
  2) Añadir ítems con `video` o `youtubeUrl`/`externalUrl`.
  3) Guardar y publicar.

- **Crear un Reto**
  1) Ir a `/admin/collections/challenges`.
  2) Completar los `days` con `dayNumber` y el material (audio/video/url).
  3) Publicar.

- **Publicación y versiones**
  - Programas y Retos soportan borradores y publicación con versiones.
  - Páginas y Posts tienen live preview y SEO. La fecha `publishedAt` se autocompleta al publicar.

### Stripe y automatizaciones
- Webhook: `/api/stripe/webhook`.
  - Maneja eventos: `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`.
  - Actualiza el usuario (estado y fechas) y registra cobros en `membership-payments`.
- Creación de checkout: `/api/stripe/create-checkout-session`.
  - Parámetros mínimos: `membershipType`, `email`, `name`.

### Formularios, redirecciones y búsqueda
- Formularios (si se usan): `forms` y `form-submissions` (plugin de Payload).
- Redirecciones: gestionadas por el plugin correspondiente.
- Búsqueda: plugin de búsqueda indexa `posts` (se puede ampliar a otras colecciones).

### Librería de medios
- Los archivos se guardan en `/public/media` y/o Vercel Blob (según configuración).
- Tamaños de imagen predefinidos: `thumbnail`, `small`, `medium`, `large`, `xlarge`, `og`.

### Buenas prácticas
- Mantener títulos y slugs claros. Evitar cambiar slugs tras publicar.
- Comprimir imágenes/vídeos antes de subirlos.
- Para audios, nombrar con prefijo del programa/reto y número de orden.
- No editar manualmente `membership-payments`.
- En `users`, solo Propietario/Gestores deberían tocar `roles` o estados de membresía.

### Solución de problemas
- Un usuario ha pagado pero no aparece activo:
  - Revisar `membership-payments` por su email/ID.
  - Ver si hay `invoice.payment_succeeded` reciente.
  - Si falta, comprobar el `STRIPE_WEBHOOK_SECRET` y el Dashboard de Stripe.
- Un audio no se reproduce:
  - Revisar que el archivo exista en `media` y que el tipo/mime sea correcto.
  - Probar con un archivo corto para descartar tamaño.

### Rutas rápidas del panel
- Programas: `/admin/collections/programs`
- Colecciones: `/admin/collections/content-collections`
- Retos: `/admin/collections/challenges`
- Pagos membresía: `/admin/collections/membership-payments`
- Usuarios: `/admin/collections/users`
- Blog/Categorías: `/admin/collections/posts` y `/admin/collections/categories`
- Medios: `/admin/collections/media`
- Páginas: `/admin/collections/pages`

---
Si necesitas nuevas vistas/campos para negocio (p. ej., varios videos por ítem o plantillas de día para retos), dímelo y lo añadimos al esquema de Payload y a la PWA.