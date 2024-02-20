import { Link } from 'expo-router'
import { Icon, SmileySad } from 'phosphor-react-native'
import { ReactNode } from 'react'
import { Paragraph, Text, XStack, YStack, getTokens } from 'tamagui'

type EmptyItemsMessage = {
  title: string
  subtitle?: string
  icon: Icon
  callback?: ReactNode
}

export function EmptyListMessage({
  title,
  subtitle,
  icon: Icon,
  callback,
}: EmptyItemsMessage) {
  return (
    <YStack flex={1} alignItems='center' justifyContent='center'>
      <XStack alignItems='flex-start'>
        <Icon size={48} color={getTokens().color.gray600.val} />
        <SmileySad size={32} weight='bold' color={getTokens().color.gray600.val} />
      </XStack>
      <Text fontSize={24} color='$gray600' fontWeight='600' mt={12}>
        {title}
      </Text>
      {subtitle && (
        <Paragraph color='$gray600' mt={4}>
          {subtitle}
        </Paragraph>
      )}

      {callback && (
        <Link href='/(stack)/(drawer)/(tabs)/products' asChild style={{ marginTop: 12 }}>
          {callback}
        </Link>
      )}
    </YStack>
  )
}
