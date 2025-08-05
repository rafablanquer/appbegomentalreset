# Variables de configuración para el proyecto
variable "vercel_org_id" {
  description = "ID de la organización en Vercel"
  type        = string
  default     = ""
}

variable "vercel_project_name" {
  description = "Nombre del proyecto en Vercel"
  type        = string
  default     = "appbegomentalreset"
}

variable "domain_name" {
  description = "Dominio personalizado (opcional)"
  type        = string
  default     = ""
}

variable "db_password" {
  description = "Password para la base de datos PostgreSQL"
  type        = string
  sensitive   = true
  default     = ""
}

variable "nextauth_secret" {
  description = "Secret para NextAuth.js"
  type        = string
  sensitive   = true
  default     = ""
}

# Variables de ambiente específicas
variable "environment_variables" {
  description = "Variables de ambiente para la aplicación"
  type        = map(string)
  default     = {}
  sensitive   = true
}