'use client'

import { ThemeProvider } from '@primer/react-brand'

interface ClientThemeProviderProps {
  children: React.ReactNode
}

export default function ClientThemeProvider({ children }: ClientThemeProviderProps) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}
