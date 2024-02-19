import { Text, TextProps, XStack } from 'tamagui'

type SkuCodeProps = {
  children: string
} & TextProps

export function SkuCode({ children, ...rest }: SkuCodeProps) {
  return (
    <XStack>
      <Text fontSize={12} {...rest} fontWeight='600' color='$blue500'>
        SKU: {children}
      </Text>
    </XStack>
  )
}
