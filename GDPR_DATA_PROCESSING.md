# Registro de Actividades de Tratamiento - GDPR
## Begoña Mental Reset (BMR)

**Fecha de creación:** ${new Date().toLocaleDateString('es-ES')}  
**Última actualización:** ${new Date().toLocaleDateString('es-ES')}

---

## 1. Información del Responsable del Tratamiento

- **Denominación:** Begoña Mental Reset (BMR)
- **Contacto:** info@begonamentalreset.com
- **Sitio web:** begonamentalreset.com
- **Actividad principal:** Servicios digitales de bienestar mental y desarrollo personal

---

## 2. Actividades de Tratamiento

### 2.1 Gestión de Usuarios y Membresías

**Finalidad:** Gestión de cuentas de usuario, membresías y acceso a contenidos

**Categorías de interesados:**
- Usuarios registrados
- Suscriptores de membresías
- Usuarios de contenido gratuito

**Categorías de datos personales:**
- Datos de identificación: nombre completo, email
- Datos de autenticación: contraseña (encriptada)
- Datos de membresía: tipo, estado, fechas de inicio/fin
- Datos de progreso: avance en programas, contenidos visualizados

**Categorías de destinatarios:**
- Personal autorizado de BMR
- Proveedores de servicios técnicos (hosting, CDN)
- Stripe (para procesamiento de pagos)

**Transferencias internacionales:**
- Stripe (Estados Unidos) - Garantías: Decisiones de Adecuación y Cláusulas Contractuales Tipo
- Servicios de hosting (según proveedor) - Garantías: Cláusulas Contractuales Tipo

**Plazos de supresión:**
- Datos de cuenta: Hasta 30 días después de la cancelación de la cuenta
- Datos de facturación: 7 años (obligación legal fiscal)
- Datos de progreso: Hasta 2 años después de la última actividad

**Medidas de seguridad:**
- Encriptación de contraseñas (bcrypt)
- Conexiones HTTPS obligatorias
- Acceso restringido a bases de datos
- Logs de auditoría de accesos

---

### 2.2 Procesamiento de Pagos

**Finalidad:** Gestión de pagos de membresías y suscripciones

**Categorías de interesados:**
- Suscriptores de membresías de pago

**Categorías de datos personales:**
- Datos de identificación: nombre, email
- Datos de facturación: procesados por Stripe (no almacenados por BMR)
- IDs de transacciones y suscripciones de Stripe

**Categorías de destinatarios:**
- Stripe (procesador de pagos)
- Personal autorizado de BMR (solo IDs, no datos de tarjetas)

**Transferencias internacionales:**
- Stripe (Estados Unidos) - Garantías: Decisiones de Adecuación UE-EEUU

**Plazos de supresión:**
- IDs de Stripe: 7 años (obligación legal fiscal)
- Datos de transacciones en Stripe: Según política de Stripe

**Medidas de seguridad:**
- PCI DSS compliance (gestionado por Stripe)
- Tokenización de datos de pago
- No almacenamiento de datos de tarjetas en servidores BMR

---

### 2.3 Comunicaciones y Soporte

**Finalidad:** Respuesta a consultas, soporte técnico y comunicaciones de servicio

**Categorías de interesados:**
- Usuarios que contactan por formulario
- Usuarios registrados (comunicaciones de servicio)

**Categorías de datos personales:**
- Datos de identificación: nombre, email
- Contenido de consultas y comunicaciones
- Historial de interacciones de soporte

**Categorías de destinatarios:**
- Personal de soporte de BMR
- Proveedores de servicios de email

**Transferencias internacionales:**
- Servicios de email (según proveedor) - Garantías: Cláusulas Contractuales Tipo

**Plazos de supresión:**
- Consultas resueltas: 2 años
- Comunicaciones de servicio: Hasta cancelación de cuenta + 30 días

**Medidas de seguridad:**
- Acceso restringido al personal de soporte
- Encriptación de comunicaciones
- Políticas de confidencialidad del personal

---

### 2.4 Analytics y Mejora de Servicios

**Finalidad:** Análisis de uso, mejora de servicios y optimización de contenido

**Categorías de interesados:**
- Todos los visitantes del sitio web (con consentimiento)

**Categorías de datos personales:**
- Datos de navegación: páginas visitadas, tiempo de sesión
- Datos técnicos: IP (anonimizada), navegador, dispositivo
- Datos de uso: interacciones con contenido, patrones de uso

**Categorías de destinatarios:**
- Google Analytics (con IP anonimizada)
- Personal de análisis de BMR

**Transferencias internacionales:**
- Google Analytics (Estados Unidos) - Garantías: Decisiones de Adecuación

**Plazos de supresión:**
- Google Analytics: 26 meses (configuración personalizada)
- Análisis internos: 2 años

**Medidas de seguridad:**
- Anonimización de IPs
- Configuración de privacidad mejorada
- Consentimiento explícito requerido

---

### 2.5 Marketing y Comunicaciones Promocionales (Futuro)

**Finalidad:** Envío de newsletters y comunicaciones promocionales

**Estado:** No implementado actualmente

**Nota:** Si se implementa en el futuro, se requerirá:
- Consentimiento explícito y granular
- Mecanismo fácil de opt-out
- Registro detallado de consentimientos
- Actualización de esta documentación

---

## 3. Base Legal para el Tratamiento

### 3.1 Ejecución de Contrato (Art. 6.1.b RGPD)
- Gestión de cuentas de usuario
- Provisión de servicios de membresía
- Procesamiento de pagos

### 3.2 Consentimiento (Art. 6.1.a RGPD)
- Cookies no esenciales
- Analytics y tracking
- Comunicaciones promocionales (futuras)

### 3.3 Interés Legítimo (Art. 6.1.f RGPD)
- Seguridad de la plataforma
- Prevención de fraude
- Mejoras técnicas del servicio

### 3.4 Obligación Legal (Art. 6.1.c RGPD)
- Conservación de datos fiscales
- Cumplimiento de obligaciones contables

---

## 4. Derechos de los Interesados

### 4.1 Procedimientos Implementados

**Derecho de Acceso:**
- Formulario de contacto específico
- Respuesta en máximo 30 días
- Formato estructurado y legible

**Derecho de Rectificación:**
- Panel de usuario para datos básicos
- Solicitud por email para otros datos
- Verificación de identidad requerida

**Derecho de Supresión:**
- Opción de eliminar cuenta en panel de usuario
- Proceso de confirmación en dos pasos
- Retención solo donde sea legalmente requerido

**Derecho de Portabilidad:**
- Exportación de datos en formato JSON
- Incluye todos los datos proporcionados por el usuario
- Proceso automatizado cuando sea posible

**Derecho de Oposición:**
- Opt-out de comunicaciones
- Configuración granular de cookies
- Información clara sobre consecuencias

**Derecho de Limitación:**
- Marcado de datos en disputa
- Suspensión temporal del procesamiento
- Notificación antes de levantar limitación

### 4.2 Plazos de Respuesta
- Confirmación de recepción: 72 horas
- Respuesta completa: Máximo 30 días
- Extensión excepcional: Hasta 60 días (con justificación)

---

## 5. Medidas de Seguridad Técnicas y Organizativas

### 5.1 Medidas Técnicas

**Cifrado:**
- HTTPS obligatorio en toda la plataforma
- Cifrado de contraseñas con bcrypt (salt rounds: 12)
- Cifrado de datos sensibles en base de datos

**Control de Acceso:**
- Autenticación de dos factores para administradores
- Políticas de contraseñas robustas
- Sesiones con timeout automático

**Integridad:**
- Backups automáticos diarios
- Verificación de integridad de backups
- Versionado de datos críticos

**Disponibilidad:**
- Monitoreo 24/7 de servicios
- Planes de recuperación ante desastres
- Redundancia en servicios críticos

### 5.2 Medidas Organizativas

**Políticas:**
- Política de privacidad by design
- Procedimientos de respuesta a incidentes
- Políticas de retención de datos

**Personal:**
- Formación en protección de datos
- Acuerdos de confidencialidad
- Principio de menor privilegio

**Auditoría:**
- Logs de acceso a datos personales
- Revisiones periódicas de seguridad
- Evaluaciones de impacto cuando sea necesario

---

## 6. Notificación de Brechas de Seguridad

### 6.1 Procedimiento de Respuesta

**Detección (0-1 horas):**
- Sistemas de monitoreo automático
- Notificaciones de alerta inmediatas
- Evaluación inicial del incidente

**Evaluación (1-24 horas):**
- Determinación del alcance de la brecha
- Identificación de datos afectados
- Evaluación del riesgo para los interesados

**Contención (24-72 horas):**
- Medidas inmediatas de contención
- Documentación detallada del incidente
- Notificación a autoridad de control si procede

**Notificación a Interesados:**
- Si hay alto riesgo para derechos y libertades
- Comunicación clara y comprensible
- Medidas recomendadas para mitigar riesgo

### 6.2 Registro de Incidentes
- Documentación de todas las brechas
- Medidas tomadas y lecciones aprendidas
- Mejoras implementadas post-incidente

---

## 7. Evaluaciones de Impacto (EIPD)

### 7.1 Criterios para EIPD
Se realizará una EIPD cuando:
- Se implemente perfilado automatizado
- Se procesen datos sensibles a gran escala
- Se implementen nuevas tecnologías de tracking

### 7.2 Estado Actual
- **Evaluación inicial:** Completada
- **Riesgo general:** Bajo-Medio
- **Próxima revisión:** Anual o ante cambios significativos

---

## 8. Contratos con Encargados del Tratamiento

### 8.1 Stripe (Procesamiento de Pagos)
- **Contrato:** Data Processing Agreement (DPA) firmado
- **Medidas de seguridad:** PCI DSS Level 1
- **Transferencias:** Estados Unidos (Decisiones de Adecuación)
- **Revisión:** Anual

### 8.2 Proveedor de Hosting
- **Contrato:** DPA incluido en términos de servicio
- **Medidas de seguridad:** ISO 27001, SOC 2
- **Ubicación:** [Especificar según proveedor]
- **Revisión:** Anual

### 8.3 Servicios de Email
- **Contrato:** DPA firmado
- **Medidas de seguridad:** Cifrado en tránsito y reposo
- **Transferencias:** Cláusulas Contractuales Tipo
- **Revisión:** Anual

---

## 9. Formación y Concienciación

### 9.1 Personal Interno
- Formación inicial en GDPR: Completada
- Actualizaciones anuales: Programadas
- Procedimientos documentados: Disponibles

### 9.2 Desarrolladores y Consultores
- Briefing de privacidad en onboarding
- Cláusulas de confidencialidad firmadas
- Acceso limitado según necesidad

---

## 10. Revisión y Actualización

### 10.1 Calendario de Revisiones
- **Revisión completa:** Anual
- **Revisión de incidentes:** Trimestral
- **Actualización por cambios:** Inmediata

### 10.2 Responsabilidades
- **Responsable de datos:** Supervisión general
- **Equipo técnico:** Implementación de medidas
- **Equipo legal:** Revisión de compliance

---

## 11. Contacto y Ejercicio de Derechos

### 11.1 Datos de Contacto
- **Email principal:** privacidad@begonamentalreset.com
- **Email general:** info@begonamentalreset.com
- **Tiempo de respuesta:** Máximo 30 días

### 11.2 Autoridad de Control
- **Organismo:** Agencia Española de Protección de Datos (AEPD)
- **Web:** www.aepd.es
- **Sede electrónica:** sedeagpd.gob.es

---

**Documento preparado por:** Equipo de Cumplimiento BMR  
**Próxima revisión programada:** ${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES')}