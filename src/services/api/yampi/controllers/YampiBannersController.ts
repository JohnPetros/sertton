import { IHttp } from '../../http/interfaces/IHttp'

import { IBannersController } from '../../interfaces/IBannersController'

import { YampiBannerAdapter } from '../adapters/YampiBannerAdapter'

import { ENDPOINTS } from '../constants/endpoints'
import { RESOURCES } from '../constants/resources'

import { YampiBanner } from '../types/YampiBanner'

export const YampiBannersController = (http: IHttp): IBannersController => {
  return {
    async getBanners() {
      const response = await http.get<{ data: YampiBanner[] }>(
        `/${RESOURCES.marketing}/${ENDPOINTS.banner}`
      )

      return response.data.map(YampiBannerAdapter)
    },
  }
}
