import { render } from '@/_tests_/customs/customRender'
import { Loading } from '..'
import { screen } from '@testing-library/react-native'
import { TEST_IDS } from './test-ids'

const message = 'loading message'
const size = 50

describe('Loading component', () => {
  it('should render message', () => {
    render(<Loading message={message} size={size} />)

    expect(screen.getByText(message)).toBeTruthy()
  })

  it('should set LottieView size', () => {
    render(<Loading message={message} size={size} />)

    const lottieView = screen.getByTestId(TEST_IDS.lottie)

    expect(lottieView.props.style.width).toBe(size)
    expect(lottieView.props.style.height).toBe(size)
  })
})
