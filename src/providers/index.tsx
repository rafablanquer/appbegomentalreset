import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { AudioPlayerProvider } from './AudioPlayer'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <AudioPlayerProvider>
          {children}
        </AudioPlayerProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
