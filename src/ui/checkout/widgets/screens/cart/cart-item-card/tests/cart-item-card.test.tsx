import { fireEvent, render, screen } from "@testing-library/react-native"

import { CartItemCard } from "../index"

describe("CartItemCard", () => {
  it("should render the item details and discounted prices", () => {
    render(
      <CartItemCard
        discountPrice={80}
        imageUrl="https://example.com/image.png"
        maxQuantity={5}
        name="Work shirt"
        onQuantityChange={jest.fn()}
        onRemove={jest.fn()}
        quantity={2}
        salePrice={100}
        skuCode="SKU-1"
        variation="Size: M"
      />,
    )

    expect(screen.getByText("SKU: SKU-1")).toBeOnTheScreen()
    expect(screen.getByText("Work shirt")).toBeOnTheScreen()
    expect(screen.getByText("• Size: M")).toBeOnTheScreen()
    expect(screen.getByText("R$ 200,00")).toBeOnTheScreen()
    expect(screen.getByText("R$ 160,00")).toBeOnTheScreen()
  })

  it("should delegate quantity changes and removal", () => {
    const onQuantityChange = jest.fn()
    const onRemove = jest.fn()

    render(
      <CartItemCard
        discountPrice={100}
        maxQuantity={3}
        name="Work shirt"
        onQuantityChange={onQuantityChange}
        onRemove={onRemove}
        quantity={2}
        salePrice={100}
        skuCode="SKU-1"
      />,
    )

    fireEvent.press(screen.getByRole("button", { name: "Diminuir quantidade" }))
    fireEvent.press(screen.getByRole("button", { name: "Aumentar quantidade" }))
    fireEvent.press(screen.getByRole("button", { name: "Remover Work shirt do carrinho" }))

    expect(onQuantityChange).toHaveBeenNthCalledWith(1, 1)
    expect(onQuantityChange).toHaveBeenNthCalledWith(2, 3)
    expect(onRemove).toHaveBeenCalledTimes(1)
  })

  it("should disable quantity controls at the item limits", () => {
    render(
      <CartItemCard
        discountPrice={0}
        maxQuantity={2}
        name="Work shirt"
        onQuantityChange={jest.fn()}
        onRemove={jest.fn()}
        quantity={2}
        salePrice={100}
        skuCode="SKU-1"
      />,
    )

    expect(screen.getByRole("button", { name: "Diminuir quantidade" })).toBeEnabled()
    expect(screen.getByRole("button", { name: "Aumentar quantidade" })).toBeDisabled()
  })
})
