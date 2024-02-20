import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { ArrowsDownUp, Faders, MagnifyingGlass } from 'phosphor-react-native'
import { useCallback } from 'react'
import { FlatList, View as ListContainer } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { Button, Spinner, View, XStack, YStack, getTokens } from 'tamagui'

// import { useTags } from './Tag/useTags'
// import { FiltersDialog } from './FiltersDialog'
// import { Tag } from './Tag'
import { useProductsList } from './useProductList'

import type { Product } from '@/@types/Product'
import { Sorter } from '@/@types/Sorter'
import { productsMock } from '@/__tests__/mocks/core/productsMock'
import { EmptyListMessage } from '@/components/shared/EmptyListMessage'
// import { EmptyItemsMessage } from '@/components/shared/EmptyItemsMessage'
// import { Loading } from '@/components/shared/Loading'
import { ProductItem } from '@/components/shared/ProductItem'
import { Select } from '@/components/shared/Select'
import { SCREEN } from '@/utils/constants/screen'
import { SORTERS } from '@/utils/constants/sorters'
// import { SORTERS } from '@/utils/constants/sorters'

const ICON_COLOR = getTokens().color.gray800.val
const ICON_SIZE = 16

export type ProductsListProps = {
  products: Product[]
  isLoading: boolean
  hasNextPage: boolean
  setSelectedSorter: (sorter: Sorter | null) => void
  onEndReached: () => void
  onRefresh: () => void
}

export function ProductsList({
  products,
  isLoading,
  hasNextPage,
  onRefresh,
  setSelectedSorter,
  onEndReached,
}: ProductsListProps) {
  const {
    data,
    layout,
    productWidth,
    isFiltersDialogLoading,
    handleSelectChange,
    handleListEndReached,
    handleFiltersDialogButton,
  } = useProductsList({
    products,
    setSelectedSorter,
    onEndReached,
  })
  // const { brands, tags, handleTag } = useTags()
  const bottomTabBarHeight = useBottomTabBarHeight()

  const keyExtractor = useCallback((item: Product) => item.id.toString(), [])

  const renderItem = ({ item }: { item: Product; index: number }) => {
    return (
      <View mb={24}>
        <ProductItem
          data={item}
          isLoading={false}
          isColumn={false}
          width={productWidth}
        />
      </View>
    )
  }

  return (
    <YStack pb={bottomTabBarHeight}>
      <XStack justifyContent='space-between' my={12}>
        <Select
          ariaLabel='Ordenar produtos por'
          defaultValue='Relevância'
          items={['Relevância', ...SORTERS.map(({ name }) => name)]}
          width={132}
          onChange={handleSelectChange}
        />

        {/* <FiltersDialog brands={brands}>
          <Button
            unstyled
            icon={<ArrowsDownUp size={16} weight="bold" />}
            color="$gray800"
            fontSize={12}
            alignSelf="center"
            alignItems="center"
            flexDirection="row"
            disabled={isFiltersDialogLoading}
            onPress={handleFiltersDialogButton}
          >
            <Faders color={ICON_COLOR} size={ICON_SIZE} />
            {isFiltersDialogLoading ? <Spinner color="$gray800" /> : 'Filtrar'}
          </Button>
        </FiltersDialog> */}
      </XStack>

      {/* <XStack flexWrap="wrap" gap={8} mb={tags.length > 0 ? 8 : 0}>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            id={tag.id}
            title={tag.title}
            type={tag.type}
            onPress={handleTag}
          />
        ))}
      </XStack> */}

      {isLoading ? (
        <FlatList
          key='productsMock'
          data={productsMock}
          keyExtractor={keyExtractor}
          renderItem={({ item, index }) => (
            <View mb={12} pl={index % 2 !== 0 ? 24 : 0}>
              <ProductItem
                data={item}
                isLoading={true}
                isColumn={layout === 'mosaic'}
                width={productWidth}
              />
            </View>
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
        />
      ) : (
        <ListContainer style={{ height: 1000 }}>
          <FlatList
            key={'products-list'}
            data={data}
            keyExtractor={(item) => String(item.id)}
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={onRefresh}
                colors={[getTokens().color.blue400.val]}
              />
            }
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.00001}
            numColumns={1}
            onEndReached={handleListEndReached}
            ListFooterComponent={
              hasNextPage ? (
                <View mt={-64}>
                  <Loading size={150} message='carregando mais produtos...' />
                </View>
              ) : null
            }
            ListEmptyComponent={
              <View h={SCREEN.height / 2}>
                <EmptyListMessage
                  title='Oh não...'
                  subtitle='Nenhum produto foi encontrado'
                  icon={MagnifyingGlass}
                />
              </View>
            }
            scrollEnabled={!isLoading}
            contentContainerStyle={{
              paddingBottom: bottomTabBarHeight * 4 + 200,
            }}
          />
        </ListContainer>
      )}
    </YStack>
  )
}
