import { useRef } from 'react'

import { Brand } from '@/@types/Brand'

import { DialogRef } from '@/components/shared/Dialog/types/DialogRef'

import { useProductsFilterStore } from '@/stores/ProductsFilterStore'
import { wait } from '@/utils/helpers/wait'

export function useFiltersDialog(brands: Brand[]) {
  const checkedBrandsIds = useProductsFilterStore(
    (store) => store.state.brandsIds
  )
  const setProductBrandsIds = useProductsFilterStore(
    (store) => store.actions.setBrandsIds
  )

  const brandsIds = useRef<string[]>(checkedBrandsIds)
  const dialogRef = useRef<DialogRef | null>(null)

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

    await wait(500)

    console.log(brandsIds.current)

    setProductBrandsIds(brandsIds.current)
  }

  return {
    brands,
    checkedBrandsIds,
    dialogRef,
    handleBrandCheckbox,
    handleDialogOpenChange,
    handleFilterButton,
  }
}
