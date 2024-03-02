import { ForwardedRef, forwardRef, useImperativeHandle, useRef } from 'react'

import { Spinner } from 'tamagui'

import { Select } from '../Select'

import { useSkuSelectors } from './useSkuSelectors'

import { SkuSelectorsRef } from './types/SkuSelectorsRef'

import type { Sku } from '@/@types/Sku'
import { SelectRef } from '../Select/useSelect'

type SkuSelectsProps = {
  productId: string
  isDisabled?: boolean
  onSkuChange?: (sku: Sku) => void
}

const SkuSelectorsComponent = (
  { productId, isDisabled, onSkuChange }: SkuSelectsProps,
  ref: ForwardedRef<SkuSelectorsRef>
) => {
  const selectRefs = useRef<SelectRef[]>([])

  const {
    selectedSku,
    variations,
    variationNames,
    errors,
    isLoading,
    onAddSkuToCart,
    handleSelectChange,
    getVariationValuesByVariationName,
  } = useSkuSelectors(productId, onSkuChange ?? null, selectRefs)

  useImperativeHandle(
    ref,
    () => {
      return {
        selectedSku,
        onAddSkuToCart,
      }
    },
    [selectedSku, onAddSkuToCart]
  )

  if (isLoading) return <Spinner size='large' color='$blue600' />

  if (variations.length)
    return (
      variationNames.length > 0 &&
      variationNames.map((variationName, index) => {
        const values = getVariationValuesByVariationName(variationName)
        const hasValues = values.length > 0

        return (
          <Select
            ref={(ref) => {
              if (ref) selectRefs.current[index] = ref
            }}
            key={variationName}
            label={variationName}
            width='100%'
            defaultValue={'Selecionar'}
            items={hasValues ? values : ['Selecionar']}
            onChange={(variationChange) => handleSelectChange(index, variationChange)}
            isDisabled={!hasValues || isDisabled}
            hasError={errors[index]}
          />
        )
      })
    )
}

export const SkuSelectors = forwardRef(SkuSelectorsComponent)
