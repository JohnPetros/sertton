import { fireEvent, render, screen } from "@testing-library/react-native"

import { QuantityInput } from "../index"

describe("QuantityInput", () => {
  it("should delegate a valid increment when the user presses the increase control", () => {
    const onChange = jest.fn()
    render(<QuantityInput max={3} onChange={onChange} value={1} />)

    fireEvent.press(screen.getByRole("button", { name: "Aumentar quantidade" }))

    expect(onChange).toHaveBeenCalledWith(2)
  })

  it("should disable the decrement control when the minimum quantity is selected", () => {
    render(<QuantityInput max={3} onChange={jest.fn()} value={1} />)

    expect(screen.getByRole("button", { name: "Diminuir quantidade" })).toBeDisabled()
  })
})
