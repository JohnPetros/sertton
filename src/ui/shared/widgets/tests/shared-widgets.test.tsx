import { fireEvent, render, screen } from "@testing-library/react-native"

import { AppSearchBar } from "../app-search-bar"
import { EmptyState } from "../empty-state"
import { ErrorState } from "../error-state"
import { Price } from "../price"

describe("shared widgets", () => {
  it("should render formatted prices when a discount is available", () => {
    render(<Price discountPrice={80} salePrice={100} />)

    expect(screen.getByText("R$ 80,00")).toBeTruthy()
    expect(screen.getByText("R$ 100,00")).toBeTruthy()
  })

  it("should delegate retry when the error action is pressed", () => {
    const onRetry = jest.fn()
    render(<ErrorState onRetry={onRetry} />)

    fireEvent.press(screen.getByRole("button", { name: "Tentar novamente" }))

    expect(onRetry).toHaveBeenCalledTimes(1)
  })

  it("should render a user-facing empty message", () => {
    render(<EmptyState message="Nenhum produto encontrado." />)

    expect(screen.getByText("Nenhum produto encontrado.")).toBeTruthy()
  })

  it("should clear the search when the clear action is pressed", () => {
    const onChangeText = jest.fn()
    render(<AppSearchBar onChangeText={onChangeText} value="cimento" />)

    fireEvent.press(screen.getByRole("button", { name: "Limpar busca" }))

    expect(onChangeText).toHaveBeenCalledWith("")
  })
})
