import { IDiscountsController } from '../../interfaces/IDiscountsController'

export function InMemoryDiscountsController(): IDiscountsController {
  return {
    async getDiscounts() {
      return []
    },
  }
}
