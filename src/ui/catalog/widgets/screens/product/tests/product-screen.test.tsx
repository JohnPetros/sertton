import { fireEvent, render, screen } from "@testing-library/react-native"

import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"
import { SkuFaker } from "@/core/catalog/entities/fakers/sku-faker"

import { ProductScreen } from "../index"
import { useProductScreen } from "../use-product-screen"

jest.mock("expo-router", () => ({
  useLocalSearchParams: jest.fn(() => ({ productId: "product-1" })),
}))

jest.mock("../use-product-screen", () => ({
  useProductScreen: jest.fn(),
}))

jest.mock("@/ui/shared/widgets/app-header", () => ({ AppHeader: () => null }))
jest.mock("@/ui/shared/widgets/error-state", () => ({
  ErrorState: ({ message }: { message?: string }) => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>{message ?? "Error"}</Text>
  },
}))
jest.mock("../product-image-viewer", () => ({
  ProductImageViewer: () => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>Product image</Text>
  },
}))
jest.mock("../product-header", () => ({
  ProductHeader: ({ title }: { title: string }) => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>{title}</Text>
  },
}))
jest.mock("../product-pricing", () => ({
  ProductPricing: () => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>Product pricing</Text>
  },
}))
jest.mock("../sku-selector", () => ({
  SkuSelector: () => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>SKU selector</Text>
  },
}))
jest.mock("../shortage-time-counter", () => ({
  ShortageTimeCounter: () => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>Stock warning</Text>
  },
}))
jest.mock("../product-description", () => ({
  ProductDescription: () => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>Description</Text>
  },
}))
jest.mock("../similar-products", () => ({
  SimilarProducts: () => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>Similar products</Text>
  },
}))
jest.mock("../installments-dialog", () => ({ InstallmentsDialog: () => null }))

const useProductScreenMock = jest.mocked(useProductScreen)

describe("ProductScreen", () => {
  const product = ProductFaker.fake({
    id: "product-1",
    name: "Canvas bag",
    skus: [SkuFaker.fake({ id: "sku-1", stock: 4, discountPrice: 80, salePrice: 100 })],
  })

  const baseState = {
    addToCart: jest.fn(),
    canAddToCart: true,
    cartQuantity: 2,
    changeQuantity: jest.fn(),
    closeInstallments: jest.fn(),
    error: undefined,
    goBack: jest.fn(),
    isInstallmentsOpen: false,
    isLoading: false,
    openInstallments: jest.fn(),
    product,
    quantity: 1,
    removeFromCart: jest.fn(),
    selectedSku: product.skus[0],
    selectSku: jest.fn(),
    variationLabel: "Size",
  }

  beforeEach(() => {
    jest.clearAllMocks()
    useProductScreenMock.mockReturnValue(baseState)
  })

  it("should render loading and error states", () => {
    useProductScreenMock.mockReturnValue({ ...baseState, isLoading: true })
    const { rerender } = render(<ProductScreen />)
    expect(screen.getByText("Carregando produto...")).toBeTruthy()

    useProductScreenMock.mockReturnValue({
      ...baseState,
      error: "Product failed",
      isLoading: false,
      product: undefined,
    })
    rerender(<ProductScreen />)
    expect(screen.getByText("Product failed")).toBeTruthy()
  })

  it("should render product content and delegate cart actions", () => {
    render(<ProductScreen />)

    expect(screen.getByText("Canvas bag")).toBeTruthy()
    expect(screen.getByText("Item no carrinho")).toBeTruthy()
    expect(screen.getByText("2 unidades adicionadas")).toBeTruthy()

    fireEvent.press(screen.getByRole("button", { name: "Voltar ao catálogo" }))
    fireEvent.press(screen.getByRole("button", { name: "Remover do carrinho" }))
    fireEvent.press(screen.getByRole("button", { name: "Adicionar ao carrinho" }))

    expect(baseState.goBack).toHaveBeenCalledTimes(1)
    expect(baseState.removeFromCart).toHaveBeenCalledTimes(1)
    expect(baseState.addToCart).toHaveBeenCalledTimes(1)
  })

  it("should disable adding when the SKU cannot be purchased", () => {
    useProductScreenMock.mockReturnValue({ ...baseState, canAddToCart: false })
    render(<ProductScreen />)

    expect(screen.getByRole("button", { name: "Adicionar ao carrinho" })).toBeDisabled()
    expect(screen.getByText("Produto indisponível")).toBeTruthy()
  })
})
