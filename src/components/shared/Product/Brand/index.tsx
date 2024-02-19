import { Text } from 'tamagui'

type BrandProps = {
  children: string
}

export function Brand({ children }: BrandProps) {
  return (
    <Text color='$gray400' textTransform='uppercase' fontSize={12}>
      {children}
    </Text>
  )
}
