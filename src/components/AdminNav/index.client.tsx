"use client"

import React from 'react'

type NavItem = { label: string; href: string; icon?: string }

const Group: React.FC<{ title: string; items: NavItem[]; first?: boolean }> = ({ title, items, first }) => (
  <div
    style={{
      marginBottom: 12,
      paddingTop: first ? 0 : 10,
      borderTop: first ? 'none' : '1px solid rgba(255,255,255,0.08)',
    }}
  >
    <div style={{ padding: '0 10px', fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.6, color: '#9CA3AF', marginBottom: 6 }}>
      {title}
    </div>
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map((it) => (
        <li key={it.href}>
          <a
            href={it.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 10px',
              borderRadius: 6,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {it.icon && (
              <span aria-hidden style={{ width: 18, textAlign: 'center' }}>
                {it.icon}
              </span>
            )}
            <span>{it.label}</span>
          </a>
        </li>
      ))}
    </ul>
  </div>
)

const AdminNav: React.FC = () => {
  return (
    <nav style={{ padding: 8 }}>
      <div style={{ marginBottom: 10 }}>
        <a
          href="/admin"
          style={{ display: 'block', padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.06)', textDecoration: 'none', color: 'inherit' }}
        >
          🏠 Dashboard
        </a>
      </div>
      <Group
        first
        title="Comunidad"
        items={[
          { label: 'Usuarios', href: '/admin/collections/users', icon: '👤' },
          { label: 'Pagos membresía', href: '/admin/collections/membership-payments', icon: '💳' },
        ]}
      />
      <Group
        title="Contenido"
        items={[
          { label: 'Páginas', href: '/admin/collections/pages', icon: '📄' },
          { label: 'Posts', href: '/admin/collections/posts', icon: '✍️' },
          { label: 'Categorías', href: '/admin/collections/categories', icon: '🏷️' },
        ]}
      />
      <Group
        title="Actividades"
        items={[
          { label: 'Programas', href: '/admin/collections/programs', icon: '📆' },
          { label: 'Retos', href: '/admin/collections/challenges', icon: '🏆' },
          { label: 'Colecciones', href: '/admin/collections/content-collections', icon: '🗂️' },
        ]}
      />
      <Group
        title="Medios"
        items={[
          { label: 'Medios', href: '/admin/collections/media', icon: '🖼️' },
          // Ocultamos temporalmente Forms y Submissions
          // { label: 'Forms', href: '/admin/collections/forms', icon: '📝' },
          // { label: 'Form Submissions', href: '/admin/collections/form-submissions', icon: '📬' },
        ]}
      />
      <Group
        title="Gestión"
        items={[
          { label: 'Respuestas Contacto', href: '/admin/collections/media', icon: '💬' },
          { label: 'Envio de emails', href: '/admin/collections/media', icon: '📧' },
          // Ocultamos temporalmente Forms y Submissions
          // { label: 'Forms', href: '/admin/collections/forms', icon: '📝' },
          // { label: 'Form Submissions', href: '/admin/collections/form-submissions', icon: '📬' },
        ]}
      />
    </nav>
  )
}

export default AdminNav


