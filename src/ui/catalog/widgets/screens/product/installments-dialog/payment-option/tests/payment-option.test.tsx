import { fireEvent, render, screen } from "@testing-library/react-native"

import { PaymentFaker } from "@/core/checkout/entities/fakers/payment-faker"

import { PaymentOption } from "../index"
import { usePaymentOption } from "../use-payment-option"

jest.mock("../use-payment-option", () => ({
  usePaymentOption: jest.fn(),
}))

const usePaymentOptionMock = jest.mocked(usePaymentOption)

describe("PaymentOption", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    usePaymentOptionMock.mockReturnValue({ select: jest.fn() })
  })

  it("should render the payment name and selection state", () => {
    const payment = PaymentFaker.fake({ id: "payment-1", name: "Pix", icon: "" })

    render(<PaymentOption isSelected payment={payment} onSelect={jest.fn()} />)

    expect(screen.getByRole("radio", { name: "Pix" })).toBeSelected()
  })

  it("should delegate selection", () => {
    const select = jest.fn()
    usePaymentOptionMock.mockReturnValue({ select })
    const payment = PaymentFaker.fake({ id: "payment-1", name: "Pix", icon: "" })
    render(<PaymentOption isSelected={false} payment={payment} onSelect={jest.fn()} />)

    fireEvent.press(screen.getByRole("radio", { name: "Pix" }))

    expect(select).toHaveBeenCalledTimes(1)
  })
})
