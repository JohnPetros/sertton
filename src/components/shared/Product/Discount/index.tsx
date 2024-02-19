import { ArrowDown, Percent } from 'phosphor-react-native'
import { Text, XStack, getTokens } from 'tamagui'

import { useDiscount } from './useDiscount'

type DiscountProps = {
  discountPrice: number
  salesPrice: number
}

export function Discount({ discountPrice, salesPrice }: DiscountProps) {
  const discount = useDiscount(discountPrice, salesPrice)

  return (
    <XStack px={4} py={2} alignItems='center' bg='$blue400' borderRadius={12} gap={2}>
      <ArrowDown color={getTokens().color.white.val} size={12} weight='bold' />
      <Text color='$white' fontSize={12} fontWeight='600'>
        {discount}
      </Text>
      <Percent color={getTokens().color.white.val} size={12} weight='bold' />
    </XStack>
  )
}
