import { Text, TextProps } from 'tamagui'

import { formatPrice } from '@/utils/helpers/formatPrice'

type PriceProps = {
  price: number
} & TextProps

export function SalePrice({ price, ...rest }: PriceProps) {
  return (
    <Text
      color='$blue500'
      fontWeight='600'
      textTransform='uppercase'
      fontSize={16}
      {...rest}
    >
      {formatPrice(price)}
    </Text>
  )
}
