import { render } from '@/_tests_/customs/customRender'
import { EmptyListMessage } from '..'
import { View } from 'react-native'
import { screen } from '@testing-library/react-native'
import { Truck } from 'phosphor-react-native'

const IconMock = () => <View />

jest.mock('phosphor-react-native', () => ({
  SmileySad: () => {
    return <IconMock />
  },
}))

describe('EmptyListMessage component', () => {
  it('should render title and icon', () => {
    const title = 'title mock'

    render(<EmptyListMessage title={title} icon={Truck} />)

    expect(screen.getByText(title)).toBeTruthy()
    expect(screen.getByTestId('message-icon')).toBeTruthy()
  })

  it('should render subtitle and callback component if they exist', () => {
    const title = 'title mock'

    const subtitle = 'subtitle mock'
    const callbackTestId = 'callback test id'

    render(
      <EmptyListMessage
        title={title}
        icon={Truck}
        subtitle={subtitle}
        callback={<View testID={callbackTestId} />}
      />,
    )

    expect(screen.getByText(subtitle)).toBeTruthy()
    expect(screen.getByTestId(callbackTestId)).toBeTruthy()
  })
})
