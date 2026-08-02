import { router } from "expo-router"
import { useCallback, useState } from "react"

import { NetInfoConnectivityProvider } from "@/providers/connectivity/net-info-connectivity-provider"

export const useOfflineScreen = () => {
  const [isRetrying, setIsRetrying] = useState(false)
  const retry = useCallback(async () => {
    setIsRetrying(true)
    if (await NetInfoConnectivityProvider.getIsConnected()) router.replace("/(main)/(tabs)")
    setIsRetrying(false)
  }, [])
  return { isRetrying, retry }
}
