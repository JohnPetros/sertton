import { fireEvent, render, screen } from "@testing-library/react-native"
import { OrderStatus } from "@/core/checkout/entities"
import { AddressFaker } from "@/core/checkout/entities/fakers/address-faker"
import { OrderFaker } from "@/core/checkout/entities/fakers/order-faker"
import { OrderItemFaker } from "@/core/checkout/entities/fakers/order-item-faker"

import { OrderAccordion } from "../index"

describe("OrderAccordion", () => {
  const order = OrderFaker.fake({
    createdAt: new Date(2026, 0, 15),
    items: [
      OrderItemFaker.fake({
        id: "item-1",
        price: 50,
        quantity: 2,
        skuCode: "SKU-1",
        skuName: "Work shirt",
        skuSalePrice: 60,
      }),
    ],
    number: "9001",
    shippingAddress: AddressFaker.fake({
      city: "Sao Paulo",
      complement: "Apt 2",
      neighborhood: "Centro",
      number: "10",
      receiver: "Customer Name",
      street: "Main Street",
      uf: "SP",
      zipcode: "01000-000",
    }),
    shippingPrice: 20,
    status: OrderStatus.paid,
  })

  it("should show the order header while collapsed", () => {
    render(<OrderAccordion isExpanded={false} onPress={jest.fn()} order={order} />)

    expect(screen.getByRole("button", { name: "Pedido 9001" })).toBeOnTheScreen()
    expect(screen.getByText("#9001")).toBeOnTheScreen()
    expect(screen.queryByText("Work shirt")).toBeNull()
  })

  it("should show order details and totals when expanded", () => {
    const onPress = jest.fn()
    render(<OrderAccordion isExpanded onPress={onPress} order={order} />)

    fireEvent.press(screen.getByRole("button", { name: "Pedido 9001" }))

    expect(onPress).toHaveBeenCalledTimes(1)
    expect(screen.getByText("Pago")).toBeOnTheScreen()
    expect(screen.getByText("Work shirt")).toBeOnTheScreen()
    expect(screen.getByText("SKU: SKU-1")).toBeOnTheScreen()
    expect(screen.getByText("Produtos (1 item)")).toBeOnTheScreen()
    expect(screen.getByText("R$ 100,00")).toBeOnTheScreen()
    expect(screen.getByText("R$ 20,00")).toBeOnTheScreen()
    expect(screen.getByText("- R$ 20,00")).toBeOnTheScreen()
    expect(screen.getByText("R$ 120,00")).toBeOnTheScreen()
    expect(screen.getByText("Customer Name")).toBeOnTheScreen()
    expect(screen.getByText("Main Street, 10 - Apt 2")).toBeOnTheScreen()
    expect(screen.getByText("Centro, Sao Paulo / SP")).toBeOnTheScreen()
    expect(screen.getByText("CEP: 01000-000")).toBeOnTheScreen()
  })
})
