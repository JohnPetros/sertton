import { Text, View, XStack, YStack } from 'tamagui'

import { Sku } from '@/@types/Sku'
import { Timer } from '@/components/shared/Timer'
import { useDate } from '@/services/date'

type StockProps = {
  sku: Sku
}

export function ProductStock({ sku }: StockProps) {
  const { calculateTimeUtilTodayEnd } = useDate()
  const timeUtilTodayEnd = calculateTimeUtilTodayEnd()

  return (
    <YStack gap={12}>
      {sku.stock > 0 && (
        <XStack gap={4}>
          <Text color='$gray800'>Apenas</Text>
          <View
            borderRadius={12}
            bg='$blue500'
            alignItems='center'
            justifyContent='center'
            w={24}
            h={24}
          >
            <Text color='$white' fontWeight='600' fontSize={12}>
              {sku.stock}
            </Text>
          </View>
          <Text color='$gray800'>produtos em estoque</Text>
        </XStack>
      )}
      <XStack alignItems='center'>
        <Text color='$gray600'>A oferta acaba em </Text>
        <Timer
          initialHours={timeUtilTodayEnd.hours}
          initialMinutes={timeUtilTodayEnd.minutes}
          initialSeconds={timeUtilTodayEnd.seconds}
        />
      </XStack>
    </YStack>
  )
}
