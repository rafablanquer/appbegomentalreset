"use client"

import React from 'react'

type NavItem = { label: string; href: string }

const Group: React.FC<{ title: string; items: NavItem[] }> = ({ title, items }) => (
  <div className="mb-4">
    <div className="px-3 text-xs uppercase tracking-wider text-neutral-400 mb-1">{title}</div>
    <ul className="space-y-1">
      {items.map((it) => (
        <li key={it.href}>
          <a className="block px-3 py-1.5 rounded hover:bg-neutral-900" href={it.href}>
            {it.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

const AdminNav: React.FC = () => {
  return (
    <nav className="p-2">
      <div className="mb-3">
        <a className="block px-3 py-2 rounded bg-neutral-900 hover:bg-neutral-800" href="/admin">
          Dashboard
        </a>
      </div>
      <Group
        title="Comunidad"
        items={[
          { label: 'Usuarios', href: '/admin/collections/users' },
          { label: 'Pagos membresía', href: '/admin/collections/membership-payments' },
        ]}
      />
      <Group
        title="Contenido"
        items={[
          { label: 'Páginas', href: '/admin/collections/pages' },
          { label: 'Posts', href: '/admin/collections/posts' },
          { label: 'Categorías', href: '/admin/collections/categories' },
        ]}
      />
      <Group
        title="Actividades"
        items={[
          { label: 'Programas', href: '/admin/collections/programs' },
          { label: 'Retos', href: '/admin/collections/challenges' },
          { label: 'Colecciones', href: '/admin/collections/content-collections' },
        ]}
      />
      <Group
        title="Medios"
        items={[
          { label: 'Medios', href: '/admin/collections/media' },
          // Ocultamos temporalmente Forms y Form Submissions para no perderlos
          // { label: 'Forms', href: '/admin/collections/forms' },
          // { label: 'Form Submissions', href: '/admin/collections/form-submissions' },
        ]}
      />
    </nav>
  )
}

export default AdminNav


