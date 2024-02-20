import { useMemo } from 'react'

import { useApi } from '@/services/api'
import { useCache } from '@/services/cache'
import { useProductsFilterStore } from '@/stores/ProductsFilterStore'
import { CACHE } from '@/utils/constants/cache'
import { FilterType, Tag } from '../types/Tag'

export function useTags() {
  const api = useApi()

  const { data: brands } = useCache({
    key: CACHE.keys.brands,
    fetcher: api.getBrands,
  })

  const setBrandsIds = useProductsFilterStore(
    (store) => store.actions.setBrandsIds
  )
  const selectedBrandsIds = useProductsFilterStore(
    (store) => store.state.brandsIds
  )

  function handleTag(filterType: FilterType, tagId: string) {
    if (filterType === 'brand') {
      setBrandsIds(selectedBrandsIds.filter((brandId) => brandId !== tagId))
    }
  }

  const tags: Tag[] = useMemo(() => {
    return brands
      ? [
        ...brands
          .filter((brand) => selectedBrandsIds.includes(brand.id))
          .map(
            (brand) =>
            ({
              id: brand.id,
              type: 'brand',
              title: brand.name,
            } as Tag)
          ),
      ]
      : []
  }, [selectedBrandsIds, brands])

  return {
    brands: brands ?? [],
    tags,
    handleTag,
  }
}
