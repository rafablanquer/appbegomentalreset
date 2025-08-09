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
    </div>
  )
}

export default BeforeDashboard
