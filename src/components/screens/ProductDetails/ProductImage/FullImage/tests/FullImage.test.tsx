import { render } from '@/_tests_/customs/customRender'
import { fireEvent, screen } from '@testing-library/react-native'

import { useFullImageMock } from './mocks/useFullImageMock'

import { FullImage } from '..'

jest.mock('../useFullImage.ts')

describe('FullImage component', () => {
  it('should have url', () => {
    useFullImageMock()

    const url = 'fullimage url'

    render(<FullImage url={url} />)

    const image = screen.getByTestId('image-id')

    expect(image.props.source.uri).toBe(url)
  })

  it('should close on press close button', () => {
    const { closeMock } = useFullImageMock()

    const url = 'fullimage url'

    render(<FullImage url={url} />)

    const closeButton = screen.getByTestId('close-button')

    fireEvent.press(closeButton)

    expect(closeMock).toHaveBeenCalled()
  })

  it('should have animated style', () => {
    const animatedStyle = { transform: [{ translateX: 100 }] }

    useFullImageMock({ animatedStyle })

    const url = 'fullimage url'

    render(<FullImage url={url} />)

    const animtedView = screen.getByTestId('animated-view')

    expect(animtedView).toHaveAnimatedStyle(animatedStyle)
  })
})
