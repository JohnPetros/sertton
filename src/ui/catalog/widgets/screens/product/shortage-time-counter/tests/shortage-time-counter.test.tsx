import { render, screen } from "@testing-library/react-native"

import { ShortageTimeCounter } from "../index"

describe("ShortageTimeCounter", () => {
  it("should render the shortage warning when stock is positive", () => {
    render(<ShortageTimeCounter stock={3} />)

    expect(screen.getByText(/Apenas/)).toBeTruthy()
    expect(screen.getByText(/3 restantes/)).toBeTruthy()
    expect(screen.getByText(/O estoque acaba em/)).toBeTruthy()
  })

  it("should not render when the product is out of stock", () => {
    render(<ShortageTimeCounter stock={0} />)

    expect(screen.queryByText(/Apenas/)).toBeNull()
  })
})
