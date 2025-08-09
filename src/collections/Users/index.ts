import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: authenticated,
    create: () => true, // Permitir registro público
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email', 'membershipType', 'membershipStatus', 'membershipEndDate'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      label: 'Roles',
      options: [
        { label: 'Propietario', value: 'owner' },
        { label: 'Gestor', value: 'manager' },
        { label: 'Miembro', value: 'member' },
      ],
      defaultValue: ['member'],
    },
    {
      name: 'membershipType',
      type: 'select',
      label: 'Tipo de Membresía',
      options: [
        { label: 'Sin membresía', value: 'none' },
        { label: 'Mensual', value: 'monthly' },
        { label: 'Trimestral', value: 'quarterly' },
        { label: 'Anual', value: 'annual' },
      ],
      defaultValue: 'none',
    },
    {
      name: 'membershipStatus',
      type: 'select',
      label: 'Estado de Membresía',
      options: [
        { label: 'Inactiva', value: 'inactive' },
        { label: 'Activa', value: 'active' },
        { label: 'Cancelada', value: 'cancelled' },
        { label: 'Pendiente', value: 'pending' },
      ],
      defaultValue: 'inactive',
    },
    {
      name: 'stripeCustomerId',
      type: 'text',
      label: 'ID de Cliente Stripe',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'stripeSubscriptionId',
      type: 'text',
      label: 'ID de Suscripción Stripe',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'membershipStartDate',
      type: 'date',
      label: 'Fecha de Inicio de Membresía',
    },
    {
      name: 'membershipEndDate',
      type: 'date',
      label: 'Fecha de Fin de Membresía',
    },
  ],
  timestamps: true,
}
