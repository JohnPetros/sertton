
import { IHttp } from '../../http/interfaces/IHttp'

import type { YampiDiscount } from '../types/YampiDiscount'

import { ENDPOINTS } from '../constants/endpoints'
import { RESOURCES } from '../constants/resources'

import type { Discount } from '@/@types/Discount'

import { IDiscountsController } from '@/services/api/interfaces/IDiscountsController'

export function YampiDiscountsController(
  http: IHttp
): IDiscountsController {
  return {
    async getDiscounts() {
      const response = await http.get<{ data: YampiDiscount[] }>(
        `/${RESOURCES.pricing}/${ENDPOINTS.discount}`
      )

      const discounts: Discount[] = response.data.map((discount) => ({
        minCost: discount.min_value,
        maxCost: discount.max_value,
        percent: discount.percent,
      }))

      return discounts
    },
  }
}
