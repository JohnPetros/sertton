import { fireEvent, screen } from '@testing-library/react-native'
import { View } from 'tamagui'

import { useSelect } from '../useSelect'
import { Select } from '..'

import { TEST_IDS } from './constants/test-ids'

import { render } from '@/_tests_/customs/customRender'
import { red } from '@/styles/colors'
import { useSelectMock } from './mocks/useSelectMock'

const CaretDown = () => <View />
const Check = () => <View />
const X = () => <View />

jest.mock('phosphor-react-native', () => ({
  CaretDown: () => {
    return <CaretDown />
  },
  Check: () => {
    return <Check />
  },
  X: () => {
    return <X />
  },
}))

jest.mock('../useSelect.ts')

const defaultValue = 'Selecionar'
const label = 'Selecione'
const hasError = false
const isDisabled = false
const width = 200
const items = ['item 1', 'item 2', 'item 3', 'item 4']
const onChangeMock = jest.fn()

describe('Select component', () => {
  it('Should render label', () => {
    useSelectMock()

    render(
      <Select
        defaultValue={defaultValue}
        label={label}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={isDisabled}
        onChange={onChangeMock}
      />
    )

    expect(screen.getByText(label)).toBeTruthy()
  })

  it('Should render selected value', () => {
    const { selectedValue } = useSelectMock()

    render(
      <Select
        defaultValue={defaultValue}
        label={label}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={isDisabled}
        onChange={onChangeMock}
      />
    )

    expect(screen.getByText(selectedValue)).toBeTruthy()
  })

  it('Should have width', () => {
    useSelectMock()

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={isDisabled}
        onChange={onChangeMock}
      />
    )

    const container = screen.getByTestId(TEST_IDS.container)
    const trigger = screen.getByTestId(TEST_IDS.trigger)

    expect(container.props.style.width).toBe(width)
    expect(trigger.props.style.width).toBe(width)
  })

  it('Should render the default value first', () => {
    useSelectMock()

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={isDisabled}
        onChange={onChangeMock}
      />
    )

    expect(screen.getByText(defaultValue)).toBeTruthy()
  })

  it('Should open on press trigger', () => {
    const { openMock } = useSelectMock()

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={false}
        onChange={onChangeMock}
      />
    )

    const trigger = screen.getByTestId(TEST_IDS.trigger)

    fireEvent.press(trigger)

    expect(openMock).toHaveBeenCalled()
  })

  it('Should not open on press trigger if it is disabled', () => {
    const { openMock } = useSelectMock()

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={true}
        onChange={onChangeMock}
      />
    )

    const trigger = screen.getByTestId(TEST_IDS.trigger)

    fireEvent.press(trigger)

    expect(openMock).not.toHaveBeenCalled()
  })

  it('Should trigger have red color if there is an error', () => {
    useSelectMock()

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={true}
        isDisabled={isDisabled}
        onChange={onChangeMock}
      />
    )

    const trigger = screen.getByTestId(TEST_IDS.trigger)

    fireEvent.press(trigger)

    expect(trigger.props.style.borderTopColor).toBe(red.red700)
    expect(trigger.props.style.borderLeftColor).toBe(red.red700)
    expect(trigger.props.style.borderRightColor).toBe(red.red700)
    expect(trigger.props.style.borderBottomColor).toBe(red.red700)
    expect(trigger.props.style.backgroundColor).toBe(red.red50)
  })

  it.each(items)('Should render item', (item) => {
    useSelectMock()

    render(
      <Select
        defaultValue={defaultValue}
        width={width}
        items={items}
        hasError={hasError}
        isDisabled={true}
        onChange={onChangeMock}
      />
    )

    expect(screen.getByText(item)).toBeTruthy()
  })
})
