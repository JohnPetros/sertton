import { render, screen } from "@testing-library/react-native"

import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"

import { SimilarProducts } from "../index"
import { useSimilarProducts } from "../use-similar-products"

jest.mock("../use-similar-products", () => ({
  useSimilarProducts: jest.fn(),
}))

jest.mock("@/ui/global/widgets/screens/home/product-card", () => ({
  ProductCard: ({ products }: { products: readonly { name: string }[] }) => {
    const { Text } = require("react-native") as typeof import("react-native")
    return <Text>{products.map((product) => product.name).join(", ")}</Text>
  },
}))

const useSimilarProductsMock = jest.mocked(useSimilarProducts)

describe("SimilarProducts", () => {
  beforeEach(() => jest.clearAllMocks())

  it("should render a loading placeholder", () => {
    useSimilarProductsMock.mockReturnValue({ isLoading: true, products: [] })

    render(<SimilarProducts productId="product-1" />)

    expect(screen.getByText("Produtos similares")).toBeTruthy()
  })

  it("should omit the section when there are no similar products", () => {
    useSimilarProductsMock.mockReturnValue({ isLoading: false, products: [] })

    render(<SimilarProducts productId="product-1" />)

    expect(screen.queryByText("Produtos similares")).toBeNull()
  })

  it("should render the similar products", () => {
    const products = [ProductFaker.fake({ name: "Travel pouch" })]
    useSimilarProductsMock.mockReturnValue({ isLoading: false, products })

    render(<SimilarProducts productId="product-1" />)

    expect(screen.getByText("Produtos similares")).toBeTruthy()
    expect(screen.getByText("Travel pouch")).toBeTruthy()
  })
})
