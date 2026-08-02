import { usePathname, useRouter } from "expo-router"
import { useEffect } from "react"

export const useConnectivityNavigation = (isConnected: boolean | undefined) => {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (isConnected === undefined || pathname === "/splash") return
    if (!isConnected && pathname !== "/offline") router.replace("/offline")
    if (isConnected && pathname === "/offline") router.replace("/")
  }, [isConnected, pathname, router])
}
