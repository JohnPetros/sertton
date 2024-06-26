import { Icon, SmileySad } from 'phosphor-react-native'
import { ReactNode } from 'react'
import { Paragraph, Text, View, XStack, YStack, getTokens } from 'tamagui'

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
    <YStack alignItems='center' justifyContent='center' gap={16}>
      <XStack alignItems='flex-start'>
        <View testID='message-icon'>
          <Icon size={48} color={getTokens().color.gray600.val} />
        </View>
        <SmileySad
          size={32}
          weight='bold'
          color={getTokens().color.gray600.val}
        />
      </XStack>
      <Text textAlign='center' color='$gray600' fontSize={24} fontWeight='600'>
        {title}
      </Text>
      {subtitle && <Paragraph color='$gray600'>{subtitle}</Paragraph>}

      {callback && callback}
    </YStack>
  )
}
