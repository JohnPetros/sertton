import type { YampiBrand } from '../types/YampiBrand'

import type { Brand } from '@/@types/Brand'

export const YampiBrandAdapter = (yampiBrand: YampiBrand) => {
  const banner: Brand = {
    id: String(yampiBrand.id),
    name: yampiBrand.name,
  }

  return banner
}
