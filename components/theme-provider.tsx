'use client'

import { PageLayout, Box } from '@primer/react'
import Navigation from './navigation'

interface ClientThemeProviderProps {
  children: React.ReactNode
}

export default function ClientThemeProvider({ children }: ClientThemeProviderProps) {
  return (
    <>
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 99,
        }}>
        <Navigation />
      </Box>
      <PageLayout rowGap="none" columnGap="none" padding="none" containerWidth="full">
        {/* <PageLayout.Header>
                        <Placeholder height={64}>Header</Placeholder>
                      </PageLayout.Header> */}
        <PageLayout.Content padding="normal">
          {children}
        </PageLayout.Content>
        {/* <PageLayout.Footer>
                          <Placeholder height={64}>Footer</Placeholder>
                        </PageLayout.Footer> */}
      </PageLayout>
    </>
  )
}
