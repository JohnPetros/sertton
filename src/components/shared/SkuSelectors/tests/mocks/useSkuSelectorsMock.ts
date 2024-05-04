import { useSkuSelectors } from '../../useSkuSelectors'

export function useSkuSelectorsMock(
  returnUseSkuSelectorsMock?: Partial<ReturnType<typeof useSkuSelectors>>,
) {
  const setSkusVariationsMock = jest.fn()
  const handleSelectChangeMock = jest.fn()
  const getVariationValuesByVariationNameMock = jest.fn()
  const onAddSkuToCartMock = jest.fn()

  jest.mocked(useSkuSelectors).mockReturnValueOnce({
    skus: [],
    selectedSku: null,
    variations: [],
    variationNames: [],
    selectedVariationsValues: [],
    errors: [],
    isLoading: false,
    setSkusVariations: setSkusVariationsMock,
    handleSelectChange: handleSelectChangeMock,
    getVariationValuesByVariationName: getVariationValuesByVariationNameMock,
    onAddSkuToCart: onAddSkuToCartMock,
    ...returnUseSkuSelectorsMock,
  })

  return {
    setSkusVariationsMock,
    handleSelectChangeMock,
    getVariationValuesByVariationNameMock,
    onAddSkuToCartMock,
  }
}
