import { TouchableOpacity, View } from 'react-native'
import { act, fireEvent, screen } from '@testing-library/react-native'

import { useDialog } from '../useDialog'
import { Dialog } from '..'

import { TEST_IDS } from './constants/test-ids'

import { render } from '@/_tests_/customs/customRender'

const X = () => <View />

jest.mock('phosphor-react-native', () => ({
  X: () => {
    return <X />
  },
}))

jest.mock('../useDialog.ts')

const triggerTestId = 'dialog trigger id'
const contentTestId = 'dialog content id'

const title = 'dialog title'
const height = 200
const width = 200

const onOpenChangeMock = jest.fn()

const closeMock = jest.fn()
const handleOpenChangeMock = jest.fn()
const openMock = jest.fn()

const Trigger = () => <TouchableOpacity testID={triggerTestId} />
const Content = () => <View testID={contentTestId} />

describe('Dialog component', () => {
  it('should render title, content and trigger when is open', () => {
    jest.mocked(useDialog).mockReturnValueOnce({
      isOpen: true,
      open: openMock,
      close: closeMock,
      handleOpenChange: handleOpenChangeMock,
    })

    render(
      <Dialog
        title={title}
        content={<Content />}
        height={height}
        width={width}
        onOpenChange={onOpenChangeMock}
      >
        <Trigger />
      </Dialog>
    )

    expect(screen.getByText(title)).toBeTruthy()
    expect(screen.getByTestId(contentTestId)).toBeTruthy()
    expect(screen.getByTestId(triggerTestId)).toBeTruthy()
  })

  it('should not render title, content is not open', () => {
    jest.mocked(useDialog).mockReturnValueOnce({
      isOpen: false,
      open: openMock,
      close: closeMock,
      handleOpenChange: handleOpenChangeMock,
    })

    render(
      <Dialog
        title={title}
        content={<Content />}
        height={height}
        width={width}
        onOpenChange={onOpenChangeMock}
      >
        <Trigger />
      </Dialog>
    )

    expect(screen.queryByText(title)).not.toBeTruthy()
    expect(screen.queryByTestId(contentTestId)).not.toBeTruthy()
  })

  it('should have width and height', () => {
    jest.mocked(useDialog).mockReturnValueOnce({
      isOpen: true,
      open: openMock,
      close: closeMock,
      handleOpenChange: handleOpenChangeMock,
    })

    render(
      <Dialog
        title={title}
        content={<Content />}
        height={height}
        width={width}
        onOpenChange={onOpenChangeMock}
      >
        <Trigger />
      </Dialog>
    )

    const dialog = screen.getByTestId(TEST_IDS.dialog)

    expect(dialog.props.style.width).toBe(width)
    expect(dialog.props.style.height).toBe(height)
  })

  it('should open when the trigger is pressed', () => {
    jest.mocked(useDialog).mockReturnValueOnce({
      isOpen: false,
      open: openMock,
      close: closeMock,
      handleOpenChange: handleOpenChangeMock,
    })

    render(
      <Dialog
        title={title}
        content={<Content />}
        height={height}
        width={width}
        onOpenChange={onOpenChangeMock}
      >
        <Trigger />
      </Dialog>
    )

    const trigger = screen.getByTestId(triggerTestId)

    act(() => {
      fireEvent.press(trigger)
    })

    expect(handleOpenChangeMock).toHaveBeenCalledWith(true)
  })

  it('should close when the close button is pressed', () => {
    jest.mocked(useDialog).mockReturnValueOnce({
      isOpen: true,
      open: openMock,
      close: closeMock,
      handleOpenChange: handleOpenChangeMock,
    })

    render(
      <Dialog
        title={title}
        content={<Content />}
        height={height}
        width={width}
        onOpenChange={onOpenChangeMock}
      >
        <Trigger />
      </Dialog>
    )

    const closeButton = screen.getByTestId(TEST_IDS.close)

    act(() => {
      fireEvent.press(closeButton)
    })

    expect(handleOpenChangeMock).toHaveBeenCalledWith(false)
  })
})
