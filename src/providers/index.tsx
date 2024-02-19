import { ReactNode } from 'react'
import { CacheProvider } from './CacheProvider'
import { TamaguiProvider } from './TamaguiProvider'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <CacheProvider>
      <TamaguiProvider>{children}</TamaguiProvider>
    </CacheProvider>
  )
}
