import type { PropsWithChildren } from "react"

import { useConnectivityGuard } from "./use-connectivity-guard"
import { useConnectivityNavigation } from "./use-connectivity-navigation"

export const ConnectivityGuard = ({ children }: PropsWithChildren) => {
  const { isConnected } = useConnectivityGuard()
  useConnectivityNavigation(isConnected)

  return children
}
