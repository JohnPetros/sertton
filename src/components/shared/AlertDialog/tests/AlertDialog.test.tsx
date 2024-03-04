import { Button } from 'tamagui'
import { fireEvent, screen } from '@testing-library/react-native'

import { render } from '@/_tests_/customs/customRender'

import { AlertDialog } from '..'
import { useAlertDialogMock } from './mocks/useAlertDialogMock'

const onCancelMock = jest.fn()
const onConfirmMock = jest.fn()

jest.mock('../useAlertDialog.ts')

describe('AlertDialog component', () => {
  it('should render trigger even it is not open', () => {
    useAlertDialogMock({ isOpen: false })

    const triggerId = 'trigger-id'

    render(
      <AlertDialog
        title='alert dialog title'
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      >
        <Button testID={triggerId} />
      </AlertDialog>
    )

    expect(screen.getByTestId(triggerId)).toBeTruthy()
  })

  it('should render title if it is open', () => {
    useAlertDialogMock({ isOpen: true })

    const title = 'alert dialog title'

    render(
      <AlertDialog title={title} onConfirm={onConfirmMock} onCancel={onCancelMock} />
    )

    expect(screen.getByText(title)).toBeTruthy()
  })

  it('should render confirm and cancel buttons if it is open', () => {
    useAlertDialogMock({ isOpen: true })

    render(
      <AlertDialog
        title='alert dialog title'
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    )

    expect(screen.getByText(/confirmar/i)).toBeTruthy()
    expect(screen.getByText(/cancelar/i)).toBeTruthy()
  })

  it('should call a function on press confirm button', () => {
    useAlertDialogMock({ isOpen: true })

    render(
      <AlertDialog
        title='alert dialog title'
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />
    )

    const confirmButton = screen.getByText(/confirmar/i)

    fireEvent.press(confirmButton)

    expect(onConfirmMock).toHaveBeenCalled()
  })
})
