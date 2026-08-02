import { faker } from "@faker-js/faker"

import { ProductFaker } from "@/core/catalog/entities/fakers/product-faker"

import type { CartItem } from "../cart-item"

export class CartItemFaker {
  static fake(cartItem?: Partial<CartItem>): CartItem {
    const product = ProductFaker.fake()

    return {
      product,
      productId: product.id,
      quantity: faker.number.int({ min: 1, max: 5 }),
      skuId: faker.string.uuid(),
      ...cartItem,
    }
  }

  static fakeMany(count = 10, cartItem?: Partial<CartItem>): CartItem[] {
    return Array.from({ length: count }, () => CartItemFaker.fake(cartItem))
  }
}
