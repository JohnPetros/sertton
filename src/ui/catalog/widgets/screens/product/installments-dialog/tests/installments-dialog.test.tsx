import { fireEvent, render, screen } from "@testing-library/react-native"
import type { ReactNode } from "react"

import { InstallmentFaker } from "@/core/checkout/entities/fakers/installment-faker"
import { PaymentFaker } from "@/core/checkout/entities/fakers/payment-faker"

import { InstallmentsDialog } from "../index"
import { useInstallmentsDialog } from "../use-installments-dialog"

jest.mock("../use-installments-dialog", () => ({
  useInstallmentsDialog: jest.fn(),
}))

jest.mock("@/ui/shared/widgets/animated-modal", () => {
  const React = require("react") as typeof import("react")
  const { View } = require("react-native") as typeof import("react-native")

  return {
    AnimatedModal: ({ visible, children }: { visible: boolean; children: ReactNode }) =>
      visible ? React.createElement(View, null, children) : null,
  }
})

const useInstallmentsDialogMock = jest.mocked(useInstallmentsDialog)

describe("InstallmentsDialog", () => {
  const payment = PaymentFaker.fake({ id: "payment-1", name: "Credit card", icon: "" })
  const installments = InstallmentFaker.fakeMany(1, {
    number: 3,
    text: "3x de R$ 40,00",
    totalValue: "R$ 120,00",
  })

  beforeEach(() => {
    jest.clearAllMocks()
    useInstallmentsDialogMock.mockReturnValue({
      error: undefined,
      installments,
      isLoading: false,
      isPaymentSelectorOpen: false,
      payments: [payment],
      selectPayment: jest.fn(),
      selectedPayment: payment,
      togglePaymentSelector: jest.fn(),
    })
  })

  it("should render the selected payment and installment rows", () => {
    render(
      <InstallmentsDialog isOpen productId="product-1" productPrice={120} onClose={jest.fn()} />,
    )

    expect(screen.getByText("Parcelamento")).toBeTruthy()
    expect(screen.getByText("Credit card")).toBeTruthy()
    expect(screen.getByText("3x de R$ 40,00")).toBeTruthy()
    expect(screen.getByText("R$ 120,00")).toBeTruthy()
  })

  it("should delegate close and payment-selector actions", () => {
    const onClose = jest.fn()
    const togglePaymentSelector = jest.fn()
    useInstallmentsDialogMock.mockReturnValue({
      error: undefined,
      installments: [],
      isLoading: false,
      isPaymentSelectorOpen: false,
      payments: [],
      selectPayment: jest.fn(),
      selectedPayment: undefined,
      togglePaymentSelector,
    })
    render(<InstallmentsDialog isOpen productId="product-1" productPrice={120} onClose={onClose} />)

    fireEvent.press(screen.getByRole("button", { name: "Fechar parcelamento" }))
    fireEvent.press(screen.getByRole("button", { name: "Selecionar bandeira" }))

    expect(onClose).toHaveBeenCalledTimes(1)
    expect(togglePaymentSelector).toHaveBeenCalledTimes(1)
  })
})
