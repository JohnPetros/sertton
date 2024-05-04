import { render } from '@/_tests_/customs/customRender'
import { SkuSelectors } from '..'
import { act, fireEvent, screen } from '@testing-library/react-native'
import { useSkuSelectorsMock } from './mocks/useSkuSelectorsMock'
import { TEST_IDS as SELECT_TEST_IDS } from '../../Select/tests/constants/test-ids'
import { variationsMock } from '@/_tests_/mocks/core/variationsMock'

jest.mock('../useSkuSelectors.ts')

const onSkuChangeMock = jest.fn()
const variationNamesMock = [
  'variation name mock 1',
  'variation name mock 2',
  'variation name mock 3',
]
const variationValuesMock = [
  'variation value mock 1',
  'variation value mock 2',
  'variation value mock 3',
]

describe('SkuSelectors component', () => {
  it('should render a spinner if is loading', () => {
    useSkuSelectorsMock({ isLoading: true })

    render(
      <SkuSelectors
        productId=''
        isDisabled={false}
        onSkuChange={onSkuChangeMock}
      />,
    )

    expect(screen.getByTestId('spinner')).toBeTruthy()
  })

  it('should get variations values by variation name', () => {
    const getVariationValuesByVariationNameMock = jest
      .fn()
      .mockReturnValueOnce([])
    const variationName = variationNamesMock[0]

    useSkuSelectorsMock({
      isLoading: false,
      variations: variationsMock,
      variationNames: [variationName],
      getVariationValuesByVariationName: getVariationValuesByVariationNameMock,
    })

    render(
      <SkuSelectors
        productId=''
        isDisabled={false}
        onSkuChange={onSkuChangeMock}
      />,
    )

    expect(getVariationValuesByVariationNameMock).toHaveBeenCalledWith(
      variationName,
    )
  })

  it('should render as many selectors as there are variations names and when there are variation', () => {
    useSkuSelectorsMock({
      isLoading: false,
      variations: [],
      variationNames: [],
    })

    const { rerender } = render(
      <SkuSelectors
        productId=''
        isDisabled={false}
        onSkuChange={onSkuChangeMock}
      />,
    )

    let selects = screen.queryAllByTestId(SELECT_TEST_IDS.container)

    expect(selects.length).toBe(0)

    useSkuSelectorsMock({
      isLoading: false,
      variations: variationsMock,
      variationNames: variationNamesMock,
      getVariationValuesByVariationName: () => variationValuesMock,
    })

    rerender(
      <SkuSelectors
        productId=''
        isDisabled={false}
        onSkuChange={onSkuChangeMock}
      />,
    )

    selects = screen.getAllByTestId(SELECT_TEST_IDS.container)

    expect(selects.length).toBe(variationNamesMock.length)
  })

  it('should disable selector if there are no variation values', () => {
    const getVariationValuesByVariationNameMock = jest
      .fn()
      .mockReturnValueOnce([])

    useSkuSelectorsMock({
      isLoading: false,
      variations: variationsMock,
      variationNames: [variationNamesMock[0]],
      getVariationValuesByVariationName: getVariationValuesByVariationNameMock,
    })

    render(
      <SkuSelectors
        productId=''
        isDisabled={false}
        onSkuChange={onSkuChangeMock}
      />,
    )

    const selectTrigger = screen.getByTestId(SELECT_TEST_IDS.trigger)

    act(() => {
      fireEvent.press(selectTrigger)
    })

    for (const value of variationValuesMock) {
      expect(screen.queryByText(value)).not.toBeTruthy()
    }

    expect(getVariationValuesByVariationNameMock).toHaveBeenCalledWith(
      variationNamesMock[0],
    )
  })

  it.skip('should pass the item index and the variation value on change select', () => {
    const { handleSelectChangeMock } = useSkuSelectorsMock({
      isLoading: false,
      variations: variationsMock,
      variationNames: [variationNamesMock[0]],
      getVariationValuesByVariationName: () => variationValuesMock,
    })

    render(
      <SkuSelectors
        productId=''
        isDisabled={false}
        onSkuChange={onSkuChangeMock}
      />,
    )

    const selectTrigger = screen.getByTestId(SELECT_TEST_IDS.trigger)

    act(() => {
      fireEvent.press(selectTrigger)
    })

    const value = variationValuesMock[0]

    const selectFirstItem = screen.getByTestId(`${SELECT_TEST_IDS.item}-1`)

    act(() => {
      fireEvent.press(selectFirstItem)
    })

    expect(handleSelectChangeMock).toHaveBeenCalledWith(0, value)
  })
})
