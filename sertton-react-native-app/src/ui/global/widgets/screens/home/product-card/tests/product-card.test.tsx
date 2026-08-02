import { fireEvent, render, screen } from "@testing-library/react-native"
import { router } from "expo-router"

import type { Product } from "@/core/catalog/entities"
import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"
import { useCatalogStore } from "@/ui/catalog/stores/catalog-store"

import { ProductCard } from "../index"

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
}))

jest.mock("@/ui/catalog/stores/catalog-store", () => ({
  useCatalogStore: jest.fn(),
}))

const routerMock = jest.mocked(router)
const useCatalogStoreMock = jest.mocked(useCatalogStore)

describe("ProductCard", () => {
  const setSelectedProduct = jest.fn()
  const product: Product = ProductFaker.fake({
    brand: { id: "brand-1", name: "Sertton" },
    name: "Arramate",
    skuCode: "SKU-1",
    skus: [
      {
        costPrice: 70,
        discountPrice: 80,
        height: 1,
        id: "sku-1",
        imageUrl: "https://example.com/sku.png",
        length: 1,
        salePrice: 100,
        skuCode: "SKU-1",
        stock: 5,
        variations: [],
        weight: 1,
        width: 1,
        yampiToken: "token-1",
      },
    ],
  })

  beforeEach(() => {
    jest.clearAllMocks()
    useCatalogStoreMock.mockImplementation((selector) =>
      selector({
        selectedProduct: undefined,
        searchTerm: "",
        setSelectedProduct,
        setSearchTerm: jest.fn(),
      }),
    )
  })

  it("should render the product information and discount", () => {
    render(<ProductCard products={[product]} />)

    expect(screen.getByRole("button", { name: "Ver Arramate" })).toBeOnTheScreen()
    expect(screen.getByText("SKU: SKU-1")).toBeOnTheScreen()
    expect(screen.getByText("Sertton")).toBeOnTheScreen()
    expect(screen.getByText(/20/)).toBeOnTheScreen()
  })

  it("should select the product and navigate to its details", () => {
    render(<ProductCard products={[product]} />)

    fireEvent.press(screen.getByRole("button", { name: "Ver Arramate" }))

    expect(setSelectedProduct).toHaveBeenCalledWith(product)
    expect(routerMock.push).toHaveBeenCalledWith(`/(main)/(tabs)/catalog/${product.id}`)
  })
})
