import { ReactNode } from 'react'
import { View } from 'tamagui'

type CellProps = {
  children: ReactNode
}

export function Cell({ children }: CellProps) {
  return (
    <View
      borderWidth={1}
      borderColor='$gray400'
      p={8}
      flex={1}
      alignItems='center'
      h='100%'
    >
      {children}
    </View>
  )
}
