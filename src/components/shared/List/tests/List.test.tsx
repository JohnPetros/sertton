import { View } from 'react-native'
import { screen } from '@testing-library/react-native'

import { render } from '@/_tests_/customs/customRender'

import { List } from '..'
import { TEST_IDS } from './constants/test-ids'

const Circle = () => <View />

jest.mock('phosphor-react-native', () => ({
  Circle: () => {
    return <Circle />
  },
}))

const itemsMock = ['item1', 'item2', 'item3']

describe('List component', () => {
  it.each(itemsMock)('should render %i', (item) => {
    render(<List items={itemsMock} isNumeric={true} />)

    expect(screen.getByText(item)).toBeTruthy()
  })

  it('should render a circle for each item if the list is not numeric', () => {
    render(<List items={itemsMock} isNumeric={false} />)

    expect(screen.getByTestId(`${TEST_IDS.circle}-1`)).toBeTruthy()
  })
})
