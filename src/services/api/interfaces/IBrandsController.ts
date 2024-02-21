import type { Brand } from '@/@types/Brand'

export interface IBrandsController {
  getBrands(): Promise<Brand[]>
}
