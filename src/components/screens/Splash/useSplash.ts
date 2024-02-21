import { useEffect } from 'react'

import { useRouter } from 'expo-router'

export function useSplash() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/(stack)/(drawer)/(tabs)/home')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router.push])
}
