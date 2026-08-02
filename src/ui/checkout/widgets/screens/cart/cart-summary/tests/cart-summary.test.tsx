import { fireEvent, render, screen } from "@testing-library/react-native"

import { CartSummary } from "../index"

describe("CartSummary", () => {
  it("should render item totals and discounts", () => {
    render(
      <CartSummary
        discount={20}
        isCheckoutEnabled
        isCheckingOut={false}
        itemCount={1}
        onCheckout={jest.fn()}
        subtotal={100}
        total={80}
      />,
    )

    expect(screen.getByText("Produtos (1 item)")).toBeOnTheScreen()
    expect(screen.getByText("R$ 100,00")).toBeOnTheScreen()
    expect(screen.getByText("Desconto")).toBeOnTheScreen()
    expect(screen.getByText("- R$ 20,00")).toBeOnTheScreen()
    expect(screen.getByText("R$ 80,00")).toBeOnTheScreen()
  })

  it("should delegate checkout and show the checking-out state", () => {
    const onCheckout = jest.fn()

    render(
      <CartSummary
        discount={0}
        isCheckoutEnabled
        isCheckingOut
        itemCount={2}
        onCheckout={onCheckout}
        subtotal={200}
        total={200}
      />,
    )

    fireEvent.press(screen.getByRole("button", { name: "Finalizar compra" }))

    expect(screen.getByText("Abrindo checkout...")).toBeOnTheScreen()
    expect(onCheckout).toHaveBeenCalledTimes(1)
  })

  it("should disable checkout when it is not enabled", () => {
    render(
      <CartSummary
        discount={0}
        isCheckoutEnabled={false}
        isCheckingOut={false}
        itemCount={0}
        onCheckout={jest.fn()}
        subtotal={0}
        total={0}
      />,
    )

    expect(screen.getByRole("button", { name: "Finalizar compra" })).toBeDisabled()
  })
})
