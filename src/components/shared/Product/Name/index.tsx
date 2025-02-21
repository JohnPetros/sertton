import { ReactNode } from 'react'
import { Text, TextProps } from 'tamagui'

type NameProps = {
  children: ReactNode
} & TextProps

export function Name({ children, ...rest }: NameProps) {
  return (
    <Text color='$gray700' fontWeight='600' fontSize={14} {...rest}>
      {children}
    </Text>
  )
}
