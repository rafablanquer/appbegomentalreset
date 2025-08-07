import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  isAuthenticated?: boolean
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className, isAuthenticated = false } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="BMR - Begoña Mental Reset"
      width={393}
      height={124}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      style={{
        width: '100%',
        height: '5vh',
        maxHeight: '74px',
        marginLeft: '14px',
      }}
      src={isAuthenticated ? "/assets/layout/BMR-nav-logo.png" : "/assets/layout/branding-Begona-BMR-1-2.png"}
    />
  )
}
