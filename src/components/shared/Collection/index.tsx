import { FlatList } from 'react-native'
import { H2, View, YStack } from 'tamagui'

import { ProductItem } from '../ProductItem'

import { ARIA_LABELS } from './constants/aria-labels'
import { TEST_IDS } from './tests/constants/test-ids'

import type { Product } from '@/@types/Product'
import { Skeleton } from '@/components/shared/Skeleton'

const PRODUCT_WIDTH = 150
const PRODUCTS_LIST_GAP = 24

type CollectionProps = {
  name: string
  products: Product[]
  isLoading: boolean
}

export function Collection({ name, products, isLoading }: CollectionProps) {
  if (products.length)
    return (
      <YStack>
        <Skeleton
          testID={TEST_IDS.collectionSkeleton}
          aria-label={
            isLoading
              ? ARIA_LABELS.collectionSkeletonVisible
              : ARIA_LABELS.collectionSkeletonInvisible
          }
          isVisible={isLoading}
          mb={isLoading ? 12 : 0}
        >
          <H2 color='$blue500' fontSize={24} mb={12}>
            {name}
          </H2>
        </Skeleton>
        <FlatList
          data={products}
          extraData={isLoading}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View mr={24}>
              <ProductItem
                data={item}
                isLoading={isLoading}
                isColumn={true}
                width={150}
              />
            </View>
          )}
          horizontal
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          getItemLayout={(_, index) => ({
            index,
            length: PRODUCT_WIDTH + PRODUCTS_LIST_GAP,
            offset: (PRODUCT_WIDTH + PRODUCTS_LIST_GAP) * index,
          })}
          showsHorizontalScrollIndicator={false}
        />
      </YStack>
    )
}
