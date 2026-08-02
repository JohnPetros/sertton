import { fireEvent, render, screen } from "@testing-library/react-native"

import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"
import { SkuFaker } from "@/core/catalog/entities/fakers/sku-faker"

import { CartScreen } from "../index"
import { useCartScreen } from "../use-cart-screen"

jest.mock("../use-cart-screen", () => ({
  useCartScreen: jest.fn(),
}))

jest.mock("@/ui/shared/widgets/app-header", () => ({
  AppHeader: () => null,
}))

const useCartScreenMock = jest.mocked(useCartScreen)

describe("CartScreen", () => {
  const clear = jest.fn()
  const checkout = jest.fn()
  const loadCartProducts = jest.fn()
  const removeItem = jest.fn()
  const setQuantity = jest.fn()

  const createState = (overrides: Partial<ReturnType<typeof useCartScreen>> = {}) => ({
    canCheckout: false,
    checkout,
    clear,
    displayItems: [],
    error: undefined,
    isCheckingOut: false,
    isHydrated: true,
    isLoading: false,
    itemCount: 0,
    loadCartProducts,
    removeItem,
    setQuantity,
    totals: { discount: 0, subtotal: 0, total: 0 },
    ...overrides,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    useCartScreenMock.mockReturnValue(createState())
  })

  it("should show the hydration loading state", () => {
    useCartScreenMock.mockReturnValue(createState({ isHydrated: false }))

    render(<CartScreen />)

    expect(screen.getByText("Carregando carrinho...")).toBeOnTheScreen()
  })

  it("should show the empty cart state and disable checkout", () => {
    render(<CartScreen />)

    expect(screen.getByText(/carrinho/)).toBeOnTheScreen()
    expect(screen.getByRole("button", { name: "Finalizar compra" })).toBeDisabled()
  })

  it("should render cart items and delegate cart actions", () => {
    const sku = SkuFaker.fake({
      discountPrice: 80,
      id: "sku-1",
      salePrice: 100,
      stock: 3,
    })
    const product = ProductFaker.fake({ id: "product-1", name: "Work shirt", skus: [sku] })
    useCartScreenMock.mockReturnValue(
      createState({
        canCheckout: true,
        displayItems: [
          {
            imageUrl: product.imageUrl,
            name: product.name,
            productId: product.id,
            quantity: 2,
            sku,
            variation: "Size: M",
          },
        ],
        itemCount: 2,
        totals: { discount: 40, subtotal: 200, total: 160 },
      }),
    )

    render(<CartScreen />)

    fireEvent.press(screen.getByRole("button", { name: "Limpar carrinho" }))
    fireEvent.press(screen.getByRole("button", { name: "Aumentar quantidade" }))
    fireEvent.press(screen.getByRole("button", { name: "Remover Work shirt do carrinho" }))
    fireEvent.press(screen.getByRole("button", { name: "Finalizar compra" }))

    expect(clear).toHaveBeenCalledTimes(1)
    expect(setQuantity).toHaveBeenCalledWith("sku-1", 3)
    expect(removeItem).toHaveBeenCalledWith("sku-1")
    expect(checkout).toHaveBeenCalledTimes(1)
  })

  it("should display an error and delegate retry", () => {
    useCartScreenMock.mockReturnValue(createState({ error: "Cart failed", itemCount: 1 }))

    render(<CartScreen />)
    fireEvent.press(screen.getByRole("button", { name: "Tentar novamente" }))

    expect(screen.getByText("Cart failed")).toBeOnTheScreen()
    expect(loadCartProducts).toHaveBeenCalledTimes(1)
  })
})
