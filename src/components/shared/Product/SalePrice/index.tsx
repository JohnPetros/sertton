import { Text, TextProps } from 'tamagui'

import { formatPrice } from '@/utils/helpers/formatPrice'

type PriceProps = {
  price: number
} & TextProps

export function SalePrice({ price, ...rest }: PriceProps) {
  return (
    <Text
      color='$gray400'
      textTransform='uppercase'
      textDecorationLine='line-through'
      fontSize={14}
      {...rest}
    >
      {formatPrice(price)}
    </Text>
  )
}
