import { Text, View } from 'tamagui'

type BadgeProps = {
  title: string
  isActive: boolean
}

export function Badge({ title, isActive }: BadgeProps) {
  if (title)
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
        <Text color={isActive ? '$blue400' : '$white'}>{title}</Text>
      </View>
    )
}
