import { ReactNode } from 'react'

import { PortalProvider } from '@gorhom/portal'
import { CacheProvider } from './CacheProvider'
import { TamaguiProvider } from './TamaguiProvider'
import { ToastProvider } from './ToastProvider'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CacheProvider>
      <TamaguiProvider>
        <ToastProvider>
          <PortalProvider>{children}</PortalProvider>
        </ToastProvider>
      </TamaguiProvider>
    </CacheProvider>
  )
}
