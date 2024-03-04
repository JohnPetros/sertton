import { Separator, Text, XStack, YStack } from 'tamagui'

import { formatPrice } from '@/utils/helpers/formatPrice'

type CartSummaryProps = {
  discount: number
  subtotal: number
  total: number
  shipmentCost?: number
  itemsCount: number
}

export function Summary({
  total,
  subtotal,
  discount,
  shipmentCost = 0,
  itemsCount,
}: CartSummaryProps) {
  return (
    <YStack gap={8}>
      <XStack justifyContent='space-between' alignItems='center'>
        <Text fontSize={16} color='$gray600'>
          Produtos ({itemsCount} {itemsCount > 1 ? 'items' : 'item'})
        </Text>
        <Text fontSize={16} color='$gray600' fontWeight='600'>
          {formatPrice(subtotal)}
        </Text>
      </XStack>
      <Separator bg='$gray400' />
      <XStack justifyContent='space-between' alignItems='center'>
        <Text fontSize={16} color='$green500'>
          Desconto
        </Text>
        <Text fontSize={16} color='$green500' fontWeight='600'>
          - {formatPrice(discount)}
        </Text>
      </XStack>
      {shipmentCost > 0 && (
        <XStack justifyContent='space-between' alignItems='center'>
          <Text fontSize={16} color='$gray600'>
            Frete
          </Text>
          <Text fontSize={16} color='$gray600' fontWeight='600'>
            + {formatPrice(shipmentCost)}
          </Text>
        </XStack>
      )}
      <Separator bg='$gray400' />
      <XStack justifyContent='space-between' alignItems='center'>
        <Text fontSize={16} color='$gray600' fontWeight='600'>
          Total
        </Text>
        <Text fontSize={16} color='$blue600' fontWeight='600'>
          {formatPrice(total)}
        </Text>
      </XStack>
    </YStack>
  )
}
