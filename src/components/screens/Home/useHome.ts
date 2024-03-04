import { useEffect } from 'react'
import { BackHandler } from 'react-native'

export function useHome() {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true)

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true)
  }, [])
}
