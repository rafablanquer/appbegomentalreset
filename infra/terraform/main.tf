# Configuración principal de Terraform para despliegue multi-cloud
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.15"
    }
  }
}

# Variables
variable "project_name" {
  description = "Nombre del proyecto"
  type        = string
  default     = "appbegomentalreset"
}

variable "environment" {
  description = "Ambiente (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "region" {
  description = "Región de AWS"
  type        = string
  default     = "us-east-1"
}

# Provider de AWS
provider "aws" {
  region = var.region
}

# Provider de Vercel
provider "vercel" {
  # Token configurado via VERCEL_API_TOKEN env var
}

# Base de datos RDS PostgreSQL
resource "aws_db_instance" "postgres" {
  identifier             = "${var.project_name}-${var.environment}"
  allocated_storage      = 20
  max_allocated_storage  = 100
  storage_type           = "gp2"
  engine                 = "postgres"
  engine_version         = "15.4"
  instance_class         = "db.t3.micro"
  db_name                = replace(var.project_name, "-", "_")
  username               = "dbuser"
  password               = "changeme" # Usar AWS Secrets Manager en producción
  vpc_security_group_ids = [aws_security_group.db.id]
  skip_final_snapshot    = true

  tags = {
    Name        = "${var.project_name}-${var.environment}-db"
    Environment = var.environment
  }
}

# Security Group para la base de datos
resource "aws_security_group" "db" {
  name_prefix = "${var.project_name}-db-"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Restringir en producción
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-db-sg"
  }
}

# Outputs
output "database_endpoint" {
  description = "Endpoint de la base de datos"
  value       = aws_db_instance.postgres.endpoint
  sensitive   = true
}

output "database_url" {
  description = "URL completa de conexión a la base de datos"
  value       = "postgresql://${aws_db_instance.postgres.username}:${aws_db_instance.postgres.password}@${aws_db_instance.postgres.endpoint}/${aws_db_instance.postgres.db_name}"
  sensitive   = true
}