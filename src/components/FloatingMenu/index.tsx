'use client'

import React, { useState } from 'react'
import { FloatingMenuButton } from './FloatingMenuButton'
import { PWASidebar } from './PWASidebar'

export const FloatingMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <>
      <FloatingMenuButton isOpen={isOpen} onClick={toggleMenu} />
      <PWASidebar isOpen={isOpen} onClose={closeMenu} />
    </>
  )
}

export default FloatingMenu