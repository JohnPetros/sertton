import { IBannersController } from '../../interfaces/IBannersController'

import { bannersMock } from '@/_tests_/mocks/core/bannersMock'

import type { Banner } from '@/@types/Banner'

export function InMemoryBannersController(): IBannersController {
  const banners: Banner[] = bannersMock

  return {
    async getBanners() {
      return banners
    },
  }
}
