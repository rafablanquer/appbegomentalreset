import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  isAuthenticated?: boolean
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      className={clsx(className)}
      alt="BMR - Begoña Mental Reset"
      width={393}
      height={124}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      style={{
        height: 'auto',
        width: 'auto',
        maxHeight: '48px',
        maxWidth: '100%',
        objectFit: 'contain',
        marginLeft: '8px',
      }}
      // Para navegación pública usar branding-Begona-BMR-1-2.png
      // Para navegación de app (autenticado) usar BMR-nav-logo.png
      src={"/assets/layout/BMR-nav-logo.png"}
    />
  )
}
