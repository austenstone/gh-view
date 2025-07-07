'use client'

import { PageLayout } from '@primer/react'
import Navigation from './navigation'

interface ClientThemeProviderProps {
  children: React.ReactNode
}

export default function ClientThemeProvider({ children }: ClientThemeProviderProps) {
  return (
    <>
      <PageLayout rowGap="none" columnGap="none" padding="none" containerWidth="full">
        <PageLayout.Header>
          <Navigation />
        </PageLayout.Header>
        <PageLayout.Content padding="normal">
          {children}
        </PageLayout.Content>
        <PageLayout.Footer>
        </PageLayout.Footer>
      </PageLayout>
    </>
  )
}
