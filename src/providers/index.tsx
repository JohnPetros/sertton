import { ReactNode } from 'react'

import { PortalProvider } from '@gorhom/portal'
import { CacheProvider } from './CacheProvider'
import { TamaguiProvider } from './TamaguiProvider'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CacheProvider>
      <TamaguiProvider>
        <PortalProvider>{children}</PortalProvider>
      </TamaguiProvider>
    </CacheProvider>
  )
}
