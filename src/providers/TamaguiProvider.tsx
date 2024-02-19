import { ReactNode } from 'react'
import { TamaguiProvider as Tamagui } from 'tamagui'

import { useColorScheme } from 'react-native'
import config from '../../tamagui.config'

type TamaguiProviderProps = {
  children: ReactNode
}

export function TamaguiProvider({ children }: TamaguiProviderProps) {
  const colorScheme = useColorScheme()

  return (
    <Tamagui config={config} defaultTheme={colorScheme as unknown as string}>
      {children}
    </Tamagui>
  )
}
