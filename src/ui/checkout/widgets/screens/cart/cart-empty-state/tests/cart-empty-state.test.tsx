import { render, screen } from "@testing-library/react-native"

import { CartEmptyState } from "../index"

describe("CartEmptyState", () => {
  it("should explain how to start shopping when the cart is empty", () => {
    render(<CartEmptyState />)

    expect(screen.getByText(/carrinho/)).toBeOnTheScreen()
    expect(screen.getByText(/Adicione produtos/)).toBeOnTheScreen()
  })
})
