import { fireEvent, render, screen } from "@testing-library/react-native"

import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"

import { CatalogScreen } from "../index"
import { useCatalogScreen } from "../use-catalog-screen"

jest.mock("../use-catalog-screen", () => ({
  useCatalogScreen: jest.fn(),
}))

jest.mock("../filters-bar", () => ({
  FiltersBar: () => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>Filters</Text>
  },
}))
jest.mock("../product-card", () => ({
  ProductCard: ({ product }: { product: { name: string } }) => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>{product.name}</Text>
  },
}))
jest.mock("../product-card/skeleton", () => ({
  ProductCardSkeleton: () => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>Product skeleton</Text>
  },
}))
jest.mock("@/ui/shared/widgets/app-header", () => ({
  AppHeader: () => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>Header</Text>
  },
}))
jest.mock("@/ui/shared/widgets/empty-state", () => ({
  EmptyState: ({ message }: { message: string }) => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>{message}</Text>
  },
}))
jest.mock("@/ui/shared/widgets/error-state", () => ({
  ErrorState: ({ message, onRetry }: { message?: string; onRetry?: () => void }) => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text onPress={onRetry}>{message}</Text>
  },
}))

const useCatalogScreenMock = jest.mocked(useCatalogScreen)

const baseState = {
  brands: [],
  brandsIds: [],
  categories: [],
  categoryId: undefined,
  error: undefined,
  hasMore: false,
  isLoading: false,
  loadMore: jest.fn(),
  products: [],
  query: "",
  refresh: jest.fn(),
  setBrandsIds: jest.fn(),
  setCategoryId: jest.fn(),
  setQuery: jest.fn(),
}

describe("CatalogScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useCatalogScreenMock.mockReturnValue(baseState)
  })

  it("should render loading skeletons", () => {
    useCatalogScreenMock.mockReturnValue({ ...baseState, isLoading: true })

    render(<CatalogScreen />)

    expect(screen.getAllByText("Product skeleton")).toHaveLength(4)
  })

  it("should render an empty state", () => {
    render(<CatalogScreen />)

    expect(screen.getByText("Nenhum produto encontrado.")).toBeTruthy()
  })

  it("should render an error and delegate retry", () => {
    const refresh = jest.fn()
    useCatalogScreenMock.mockReturnValue({ ...baseState, error: "Catalog failed", refresh })

    render(<CatalogScreen />)
    fireEvent.press(screen.getByText("Catalog failed"))

    expect(refresh).toHaveBeenCalledTimes(1)
  })

  it("should render loaded products", () => {
    useCatalogScreenMock.mockReturnValue({
      ...baseState,
      products: [ProductFaker.fake({ name: "Loaded product" })],
    })

    render(<CatalogScreen />)

    expect(screen.getByText("Loaded product")).toBeTruthy()
  })
})
