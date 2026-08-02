import { router } from "expo-router"
import { useEffect } from "react"

export const useSplashScreen = (delay = 1200) => {
  useEffect(() => {
    const timeout = setTimeout(() => router.replace("/(main)/(tabs)"), delay)
    return () => clearTimeout(timeout)
  }, [delay])
}
