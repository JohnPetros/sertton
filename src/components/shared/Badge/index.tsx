import { Text, View } from 'tamagui'

type BadgeProps = {
  children: string
  isActive: boolean
}

export function Badge({ children, isActive }: BadgeProps) {
  console.log({ children })
  return (
    <View
      position='absolute'
      bg={isActive ? '$white' : '$blue400'}
      w={24}
      h={24}
      borderRadius={12}
      top={-8}
      right={-8}
      zIndex={50}
      alignItems='center'
      justifyContent='center'
      elevationAndroid={1}
    >
      <Text color={isActive ? '$blue400' : '$white'}>{children}</Text>
    </View>
  )
}
