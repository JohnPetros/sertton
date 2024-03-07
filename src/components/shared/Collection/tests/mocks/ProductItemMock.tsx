import { Text } from 'react-native'
import { View } from 'tamagui'

import { ProductItemProps } from '@/components/shared/ProductItem'

const ProductItem = ({ data }: ProductItemProps) => (
  <View>
    <Text>{data.name}</Text>
  </View>
)

jest.mock('@/components/shared/ProductItem', () => ({
  ProductItem: (productItemProps: ProductItemProps) => {
    return <ProductItem {...productItemProps} />
  },
}))
