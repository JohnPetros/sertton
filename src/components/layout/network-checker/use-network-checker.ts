import NetInfo from '@react-native-community/netinfo'
import { useEffect, useState } from 'react'

export function useNetworkChecker() {
  const [isNetworkConnected, setIsNetworkConnected] = useState(true)

  console.log(isNetworkConnected)

  useEffect(() => {
    NetInfo.addEventListener((netState) => {
      setIsNetworkConnected(Boolean(netState.isConnected))
    })
  }, [])

  return {
    isNetworkConnected,
  }
}
