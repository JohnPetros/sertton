import { RefObject, useRef } from 'react'

import { Brand } from '@/@types/Brand'

import { DialogRef } from '@/components/shared/Dialog/types/DialogRef'

import { useProductsFilterStore } from '@/stores/ProductsFilterStore'

export function useFiltersDialog(
  brands: Brand[],
  dialogRef: RefObject<DialogRef>,
) {
  const checkedBrandsIds = useProductsFilterStore(
    (store) => store.state.brandsIds,
  )
  const setProductBrandsIds = useProductsFilterStore(
    (store) => store.actions.setBrandsIds,
  )

  const brandsIds = useRef<string[]>(checkedBrandsIds)

  function addBrandId(id: string) {
    brandsIds.current = [...brandsIds.current, id]
  }

  function removeBrandId(id: string) {
    brandsIds.current = brandsIds.current.filter((brandId) => brandId !== id)
  }

  function handleBrandCheckbox(brandId: string, isChecked: boolean) {
    const id = brandId

    if (isChecked) {
      addBrandId(id)
    } else if (!isChecked) {
      removeBrandId(id)
    }
  }

  function handleDialogOpenChange() {
    brandsIds.current = checkedBrandsIds
  }

  async function handleFilterButton() {
    dialogRef.current?.close()

    setProductBrandsIds(brandsIds.current)
  }

  return {
    brandsIds,
    brands,
    checkedBrandsIds,
    dialogRef,
    handleBrandCheckbox,
    handleDialogOpenChange,
    handleFilterButton,
  }
}
