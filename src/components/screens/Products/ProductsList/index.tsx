import { useCallback } from 'react'
import { FlatList, RefreshControl, View as ListContainer } from 'react-native'

import { ArrowsDownUp, Faders, MagnifyingGlass } from 'phosphor-react-native'

import { Button, Spinner, View, XStack, YStack, getTokens } from 'tamagui'

import { useProductsList } from './useProductList'

import { productsMock } from '@/_tests_/mocks/core/productsMock'

import type { Product } from '@/@types/Product'
import { Sorter } from '@/@types/Sorter'

import { useTags } from './Tag/useTags'

import { Tag } from './Tag'

import { EmptyListMessage } from '@/components/shared/EmptyListMessage'
import { FiltersDialog } from '@/components/shared/FiltersDialog'
import { Loading } from '@/components/shared/Loading'
import { ProductItem } from '@/components/shared/ProductItem'
import { Select } from '@/components/shared/Select'

import { SCREEN } from '@/utils/constants/screen'
import { SORTERS } from '@/utils/constants/sorters'

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

  const ICON_COLOR = getTokens().color.gray800.val
  const ICON_SIZE = 16

  const { brands, tags, handleTag } = useTags()

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
    <YStack>
      <XStack justifyContent='space-between' my={12}>
        <Select
          ariaLabel='Ordenar produtos por'
          defaultValue='Relevância'
          items={['Relevância', ...SORTERS.map(({ name }) => name)]}
          width={132}
          onChange={handleSelectChange}
        />

        <FiltersDialog brands={brands}>
          <Button
            unstyled
            icon={<ArrowsDownUp size={16} weight='bold' />}
            color='$gray800'
            fontSize={12}
            alignSelf='center'
            alignItems='center'
            flexDirection='row'
            disabled={isFiltersDialogLoading}
            pressStyle={{
              opacity: 0.7,
            }}
            onPress={handleFiltersDialogButton}
          >
            <Faders color={ICON_COLOR} size={ICON_SIZE} />
            {isFiltersDialogLoading ? <Spinner color='$gray800' /> : 'Filtrar'}
          </Button>
        </FiltersDialog>
      </XStack>

      <XStack flexWrap='wrap' gap={8} mb={tags.length > 0 ? 8 : 0}>
        {tags.map((tag) => (
          <Tag
            key={tag.id}
            id={tag.id}
            title={tag.title}
            type={tag.type}
            onPress={handleTag}
          />
        ))}
      </XStack>

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
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          onEndReached={handleListEndReached}
          ListFooterComponent={
            hasNextPage ? (
              <View mt={-36}>
                <Loading size={150} message='carregando mais produtos...' />
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View>
              <EmptyListMessage
                title='Oh não...'
                subtitle='Nenhum produto foi encontrado'
                icon={MagnifyingGlass}
              />
            </View>
          }
          scrollEnabled={!isLoading}
          contentContainerStyle={{
            paddingBottom: SCREEN.paddingBottom * 4,
          }}
        />
      )}
    </YStack>
  )
}
