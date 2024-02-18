import type { Banner } from '@/@types/Banner'

export interface IBannersController {
  getBanners(): Promise<Banner[]>
}
