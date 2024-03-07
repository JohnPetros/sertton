import { Text, View } from "react-native"
import { screen } from "@testing-library/react-native"

import { ProductsList } from ".."

import { render } from "@/_tests_/customs/customRender"
import { productsMock } from "@/_tests_/mocks/core/productsMock"
import "@/_tests_/mocks/components/ProductItem"
import "@/_tests_/mocks/components/FiltersDialogMock"

import { ProductItemProps } from "@/components/shared/ProductItem"

import { useTagsMock } from "./mocks/useTagsMock"
import { useProductsListMock } from "./mocks/useProductsList"
import { tagsMock } from "@/_tests_/mocks/core/tagsMock"

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

const Icon = () => <View />

jest.mock('phosphor-react-native', () => ({
  X: () => {
    return <Icon />
  },
  Check: () => {
    return <Icon />
  },
  ArrowsDownUp: () => {
    return <Icon />
  },
  Faders: () => {
    return <Icon />
  },
  CaretDown: () => {
    return <Icon />
  },
  Truck: () => {
    return <Icon />
  },
  MagnifyingGlass: () => {
    return <Icon />
  },
  SmileySad: () => {
    return <Icon />
  },
}))

const onEndReachedMock = jest.fn()
const setSelectedSorterMock = jest.fn()
const onRefreshPageMock = jest.fn()

jest.mock('@/services/api')
jest.mock('../useProductList.ts')
jest.mock('../Tag/useTags')

describe('ProductsList component', () => {
  it('should render products list loading', () => {
    useProductsListMock()
    useTagsMock()

    render(
      <ProductsList
        products={productsMock}
        isLoading={true}
        hasNextPage={true}
        onRefresh={onRefreshPageMock}
        onEndReached={onEndReachedMock}
        onSelectSorter={setSelectedSorterMock}
      />
    )

    expect(screen.getByTestId('products-list-loading')).toBeTruthy()
    expect(screen.queryByTestId('products-list')).not.toBeTruthy()
  })

  it('should render loading component when has next page and not loading', () => {
    useTagsMock()
    useProductsListMock()

    render(
      <ProductsList products={productsMock}
        isLoading={false}
        hasNextPage={true}
        onRefresh={onRefreshPageMock}
        onEndReached={onEndReachedMock}
        onSelectSorter={setSelectedSorterMock}
      />
    )

    expect(screen.getByTestId('loading')).toBeTruthy()
  })

  it('should render empty list message when the fetched products list is empty and not loading nor has next page', () => {
    useTagsMock()
    useProductsListMock({ data: [] })

    render(
      <ProductsList
        products={productsMock}
        isLoading={false}
        hasNextPage={false}
        onRefresh={onRefreshPageMock}
        onEndReached={onEndReachedMock}
        onSelectSorter={setSelectedSorterMock}
      />
    )

    expect(screen.getByText('Nenhum produto foi encontrado')).toBeTruthy()
  })

  it('should render filter button', () => {
    useTagsMock()
    useProductsListMock({ data: [] })

    render(
      <ProductsList
        products={productsMock}
        isLoading={false}
        hasNextPage={false}
        onRefresh={onRefreshPageMock}
        onEndReached={onEndReachedMock}
        onSelectSorter={setSelectedSorterMock}
      />
    )

    expect(screen.getByText('Filtrar')).toBeTruthy()
  })

  it.each(tagsMock)('should render $title tag', ({ title }) => {
    useTagsMock({ tags: tagsMock })
    useProductsListMock({ data: [] })

    render(
      <ProductsList
        products={productsMock}
        isLoading={false}
        hasNextPage={false}
        onRefresh={onRefreshPageMock}
        onEndReached={onEndReachedMock}
        onSelectSorter={setSelectedSorterMock}
      />
    )

    expect(screen.getByText(title)).toBeTruthy()
  })
})
