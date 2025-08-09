"use client"

import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'
import AdminDashboard from '../AdminDashboard/index.client'

const baseClass = 'before-dashboard'

const Card: React.FC<{ title: string; description: string; href: string }> = ({ title, description, href }) => (
  <a className="block rounded-md border border-neutral-800 bg-neutral-950 p-4 hover:bg-neutral-900" href={href}>
    <div className="text-base font-semibold mb-1">{title}</div>
    <div className="text-sm text-neutral-300">{description}</div>
  </a>
)

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Panel BMR listo</h4>
      </Banner>
      <div className="mb-4">
        <SeedButton />
      </div>
      <AdminDashboard />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <Card title="Programas" description="Gestiona programas de audio" href="/admin/collections/programs" />
        <Card title="Colecciones" description="Ítems con video / enlaces" href="/admin/collections/content-collections" />
        <Card title="Retos" description="Días con audio, video o enlaces" href="/admin/collections/challenges" />
        <Card title="Pagos de membresía" description="Histórico de cobros (Stripe)" href="/admin/collections/membership-payments" />
        <Card title="Usuarios" description="Roles y estado de membresía" href="/admin/collections/users" />
        <Card title="Blog" description="Posts y categorías" href="/admin/collections/posts" />
      </div>
    </div>
  )
}

export default BeforeDashboard
