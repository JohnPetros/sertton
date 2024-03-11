import { brandsMock } from '@/_tests_/mocks/core/brandsMock'
import { FiltersDialog } from '..'
import { Button } from '../../Button'
import { render } from '@/_tests_/customs/customRender'
import { fireEvent, screen } from '@testing-library/react-native'
import { View } from 'tamagui'

const Icon = () => <View />

jest.mock('phosphor-react-native', () => ({
  Check: () => {
    return <Icon />
  },
  Truck: () => {
    return <Icon />
  },
  X: () => {
    return <Icon />
  },
}))

describe('FiltersDialog component', () => {
  it('should render dialog trigger', () => {
    const triggerId = 'trigger-id'

    render(
      <FiltersDialog brands={brandsMock}>
        <Button testID={triggerId} />
      </FiltersDialog>,
    )

    expect(screen.getByTestId(triggerId)).toBeTruthy()
  })

  it.each(brandsMock)('should render $name brand', ({ name }) => {
    const triggerId = 'trigger-id'

    render(
      <FiltersDialog brands={brandsMock}>
        <Button testID={triggerId} />
      </FiltersDialog>,
    )

    fireEvent.press(screen.getByTestId(triggerId))

    expect(screen.getByText(name)).toBeTruthy()
  })
})
