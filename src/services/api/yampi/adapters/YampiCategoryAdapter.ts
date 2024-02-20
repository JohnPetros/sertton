import type { YampiCategory } from '../types/YampiCategory'

import type { Category } from '@/@types/Category'
import { removeHTMLTags } from '@/utils/helpers/removeHTMLTags'

export const YampiCategoryAdapter = (yampiCategory: YampiCategory) => {
  const banner: Category = {
    id: String(yampiCategory.id),
    name: yampiCategory.name,
    description: removeHTMLTags(yampiCategory.description),
  }

  return banner
}
