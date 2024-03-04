
import { IHttp } from '../../http/interfaces/IHttp'

import type { YampiComment } from '../types/YampiComment'

import { ENDPOINTS } from '../constants/endpoints'
import { RESOURCES } from '../constants/resources'

import { ICommentsController } from '../../interfaces/ICommentsController'

export function YampiCommentsController(
  http: IHttp
): ICommentsController {
  return {
    async getCommentsByProductId(productId: string) {
      const response = await http.get<{ data: YampiComment[] }>(
        `/${RESOURCES.catalog}/${ENDPOINTS.comment}/23222124`
      )

      console.log(response.data)

      return response.data
    },
  }
}
