import { faker } from "@faker-js/faker"

import type { OrderItem } from "../order-item"

export class OrderItemFaker {
  static fake(orderItem?: Partial<OrderItem>): OrderItem {
    const salePrice = faker.number.float({ fractionDigits: 2, min: 10, max: 1000 })

    return {
      id: faker.string.uuid(),
      price: salePrice,
      quantity: faker.number.int({ min: 1, max: 5 }),
      skuCode: faker.string.alphanumeric(8).toUpperCase(),
      skuDiscountPrice: salePrice * 0.9,
      skuName: faker.commerce.productName(),
      skuSalePrice: salePrice,
      ...orderItem,
    }
  }

  static fakeMany(count = 10, orderItem?: Partial<OrderItem>): OrderItem[] {
    return Array.from({ length: count }, () => OrderItemFaker.fake(orderItem))
  }
}
