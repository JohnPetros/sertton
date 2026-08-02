import { faker } from "@faker-js/faker"
import { type Order, OrderStatus } from "../order"
import { AddressFaker } from "./address-faker"
import { OrderItemFaker } from "./order-item-faker"
import { PaymentFaker } from "./payment-faker"

export class OrderFaker {
  static fake(order?: Partial<Order>): Order {
    return {
      createdAt: faker.date.recent(),
      items: OrderItemFaker.fakeMany(1),
      number: faker.string.numeric(8),
      payment: PaymentFaker.fake(),
      shippingAddress: AddressFaker.fake(),
      shippingName: faker.person.fullName(),
      shippingPrice: faker.number.float({ fractionDigits: 2, min: 0, max: 100 }),
      status: faker.helpers.arrayElement(Object.values(OrderStatus)),
      ...order,
    }
  }

  static fakeMany(count = 10, order?: Partial<Order>): Order[] {
    return Array.from({ length: count }, () => OrderFaker.fake(order))
  }
}
