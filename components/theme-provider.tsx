'use client'

import { ThemeProvider } from '@primer/react-brand'
import { PageLayout, Box, BaseStyles } from '@primer/react'
import Navigation from './navigation'

interface ClientThemeProviderProps {
  children: React.ReactNode
}

export default function ClientThemeProvider({ children }: ClientThemeProviderProps) {
  return (
    <ThemeProvider>
      <BaseStyles>
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
        <PageLayout.Footer>
          <Placeholder height={64}>Footer</Placeholder>
        </PageLayout.Footer>
      </PageLayout>
      </BaseStyles>
    </ThemeProvider>
  )
}

function Placeholder({ height, children }: { height: number | string; children: React.ReactNode }) {
  return (
    <Box
      sx={{
        width: '100%',
        height,
        display: 'grid',
        placeItems: 'center',
        bg: 'canvas.inset',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'border.subtle',
      }}
    >
      {children}
    </Box>
  )
}