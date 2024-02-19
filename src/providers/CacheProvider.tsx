import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

interface ToastProviderProps {
  children: ReactNode
}

export function CacheProvider({ children }: ToastProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
