# Infraestructura

Configuración de despliegue y orquestación para diferentes proveedores.

## 📁 Estructura

### `vercel/`
- **Descripción**: Configuración para despliegue en Vercel
- **Archivos**: `vercel.json` con configuración del proyecto
- **Uso**: Deploy automático del frontend desde `apps/web`

### `docker/`
- **Descripción**: Contenedores Docker para todos los servicios
- **Archivos**: 
  - `Dockerfile.web` - Container para Next.js
  - `Dockerfile.cms` - Container para Payload CMS
  - `docker-compose.yml` - Orquestación completa con PostgreSQL

### `terraform/`
- **Descripción**: Infraestructura como código para múltiples proveedores
- **Archivos**:
  - `main.tf` - Recursos principales (RDS, security groups)
  - `variables.tf` - Variables de configuración
- **Proveedores**: AWS, Vercel

## 🚀 Despliegues

### Desarrollo Local
```bash
# Con Docker Compose
cd infra/docker
docker-compose up -d
```

### Vercel (Frontend)
```bash
# Deploy automático desde GitHub
# O manual:
vercel --prod
```

### Docker (CMS)
```bash
# Build y deploy del CMS
docker build -f infra/docker/Dockerfile.cms -t cms .
docker run -p 3001:3001 cms
```

### Terraform (Infraestructura)
```bash
cd infra/terraform
terraform init
terraform plan
terraform apply
```

## 🔧 Configuración

Asegúrate de configurar las variables de entorno apropiadas para cada ambiente:

- `.env` para desarrollo local
- Secrets en Vercel para producción
- Variables en AWS/otros proveedores via Terraform