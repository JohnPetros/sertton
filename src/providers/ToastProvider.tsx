import { Truck } from 'phosphor-react-native'
import { ReactNode } from 'react'

import { ToastProvider as Provider } from 'react-native-toast-notifications'

import { getTokens } from 'tamagui'

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <Provider
      placement='bottom'
      duration={5000}
      animationType='slide-in'
      successColor={getTokens().color.blue500.val}
      dangerColor={getTokens().color.red500.val}
      warningColor={getTokens().color.yellow500.val}
      icon={<Truck color={getTokens().color.white.val} />}
      textStyle={{ fontSize: 16, paddingHorizontal: 16 }}
      offsetBottom={80}
      swipeEnabled={true}
    >
      {children}
    </Provider>
  )
}
