'use client'

import { usePathname } from 'next/navigation'
import { SubdomainNavBar } from '@primer/react-brand'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <SubdomainNavBar title="GitHub View" fullWidth>
      <SubdomainNavBar.Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>
        Home
      </SubdomainNavBar.Link>
      <SubdomainNavBar.Link href="/webhooks" aria-current={pathname === '/webhooks' ? 'page' : undefined}>
        Webhooks
      </SubdomainNavBar.Link>
    </SubdomainNavBar>
  )
}
