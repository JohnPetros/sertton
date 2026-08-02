import { fireEvent, render, screen } from "@testing-library/react-native"

import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"
import { SkuFaker } from "@/core/catalog/entities/fakers/sku-faker"

import { ProductCard } from "../index"
import { useProductCard } from "../use-product-card"

jest.mock("../use-product-card", () => ({
  useProductCard: jest.fn(),
}))

jest.mock("@/ui/shared/widgets/cart-dialog", () => ({
  CartDialog: ({ isOpen }: { isOpen: boolean }) => {
    const { Text } = require("react-native") as typeof import("react-native")
    return isOpen ? <Text>Cart dialog</Text> : null
  },
}))

const useProductCardMock = jest.mocked(useProductCard)

describe("ProductCard", () => {
  const product = ProductFaker.fake({
    name: "Canvas backpack",
    skuCode: "SKU-42",
    skus: [SkuFaker.fake({ discountPrice: 80, salePrice: 100 })],
  })

  beforeEach(() => {
    jest.clearAllMocks()
    useProductCardMock.mockReturnValue({
      closeCartDialog: jest.fn(),
      isCartDialogOpen: false,
      openCartDialog: jest.fn(),
      openProduct: jest.fn(),
      sku: product.skus[0],
    })
  })

  it("should render product details and its discount", () => {
    render(<ProductCard product={product} />)

    expect(screen.getByText("SKU: SKU-42")).toBeTruthy()
    expect(screen.getByText("Canvas backpack")).toBeTruthy()
    expect(screen.getByText("20 %")).toBeTruthy()
  })

  it("should delegate product and cart actions", () => {
    const openProduct = jest.fn()
    const openCartDialog = jest.fn()
    useProductCardMock.mockReturnValue({
      closeCartDialog: jest.fn(),
      isCartDialogOpen: false,
      openCartDialog,
      openProduct,
      sku: product.skus[0],
    })
    render(<ProductCard product={product} />)

    fireEvent.press(screen.getByRole("button", { name: "Ver Canvas backpack" }))
    const addToCartButtons = screen.getAllByRole("button", {
      name: "Adicionar Canvas backpack ao carrinho",
    })[1]
    expect(addToCartButtons).toBeDefined()
    if (!addToCartButtons) throw new Error("Expected the nested add-to-cart button")
    fireEvent.press(addToCartButtons, {
      stopPropagation: jest.fn(),
    })

    expect(openProduct).toHaveBeenCalled()
    expect(openCartDialog).toHaveBeenCalledTimes(1)
  })

  it("should render the cart dialog when the hook opens it", () => {
    useProductCardMock.mockReturnValue({
      closeCartDialog: jest.fn(),
      isCartDialogOpen: true,
      openCartDialog: jest.fn(),
      openProduct: jest.fn(),
      sku: product.skus[0],
    })

    render(<ProductCard product={product} />)

    expect(screen.getByText("Cart dialog")).toBeTruthy()
  })
})
