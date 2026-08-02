import { useEffect, useState } from "react"

import { NetInfoConnectivityProvider } from "@/providers/connectivity/net-info-connectivity-provider"

export const useConnectivityGuard = () => {
  const [isConnected, setIsConnected] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    let isMounted = true
    void NetInfoConnectivityProvider.getIsConnected().then((value) => {
      if (isMounted) setIsConnected(value)
    })
    const unsubscribe = NetInfoConnectivityProvider.subscribe(setIsConnected)
    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  return { isConnected }
}
