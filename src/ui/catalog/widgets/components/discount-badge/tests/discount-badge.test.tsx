import { render, screen } from "@testing-library/react-native"

import { DiscountBadge } from "../index"

describe("DiscountBadge", () => {
  it("should render the discount percentage when the discount is positive", () => {
    render(<DiscountBadge discount={25} />)

    expect(screen.getByText("25%")).toBeTruthy()
  })

  it("should not render when the discount is zero or negative", () => {
    const { rerender } = render(<DiscountBadge discount={0} />)

    expect(screen.queryByText("0%")).toBeNull()

    rerender(<DiscountBadge discount={-10} />)

    expect(screen.queryByText("-10%")).toBeNull()
  })
})
