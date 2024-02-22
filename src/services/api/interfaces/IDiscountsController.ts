import type { Discount } from "@/@types/Discount"

export interface IDiscountsController {
  getDiscounts(): Promise<Discount[]>
}
