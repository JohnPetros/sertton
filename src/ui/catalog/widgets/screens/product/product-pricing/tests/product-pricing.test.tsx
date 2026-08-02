import { fireEvent, render, screen } from "@testing-library/react-native"

import { ProductPricing } from "../index"

describe("ProductPricing", () => {
  it("should render the discounted price and discount badge", () => {
    render(<ProductPricing discountPrice={80} salePrice={100} onShowInstallments={jest.fn()} />)

    expect(screen.getByText("R$ 100,00")).toBeTruthy()
    expect(screen.getByText("R$ 80,00")).toBeTruthy()
    expect(screen.getByText("20%")).toBeTruthy()
  })

  it("should render only the sale price when there is no valid discount", () => {
    render(<ProductPricing discountPrice={100} salePrice={100} onShowInstallments={jest.fn()} />)

    expect(screen.getByText("R$ 100,00")).toBeTruthy()
    expect(screen.queryByText("0%")).toBeNull()
  })

  it("should delegate the installments action", () => {
    const onShowInstallments = jest.fn()
    render(
      <ProductPricing discountPrice={80} salePrice={100} onShowInstallments={onShowInstallments} />,
    )

    fireEvent.press(screen.getByRole("button"))

    expect(onShowInstallments).toHaveBeenCalledTimes(1)
  })
})
