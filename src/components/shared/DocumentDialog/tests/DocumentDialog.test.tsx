import { render } from '@/_tests_/customs/customRender'
import {
  act,
  fireEvent,
  screen,
  userEvent,
  waitFor,
} from '@testing-library/react-native'

import { useDocumentDialogMock } from './mocks/useDocumentDialogMock'
import { DocumentDialog } from '..'

const onValidateDocumentMock = jest.fn()

jest.mock('../useDocumentDialog.ts')

describe('DocumentDialog component', () => {
  it('should render dialog title and description', () => {
    const { dialogRef } = useDocumentDialogMock()

    render(<DocumentDialog onValidateDocument={onValidateDocumentMock} />)

    act(() => {
      dialogRef.current?.open()
    })

    expect(screen.getByText('Identifique-se')).toBeTruthy()
    expect(
      screen.getByText(
        'Digite seu e-mail para buscarmos os pedidos vinculados a ele.',
      ),
    ).toBeTruthy()
  })

  it('should render a spinner if it is loading', () => {
    const { dialogRef: firstDialogRef } = useDocumentDialogMock({
      isLoading: false,
    })

    const { rerender } = render(
      <DocumentDialog onValidateDocument={onValidateDocumentMock} />,
    )

    act(() => {
      firstDialogRef.current?.open()
    })

    expect(screen.getByText('Buscar pedidos')).toBeTruthy()
    expect(screen.queryByTestId('spinner')).not.toBeTruthy()

    const { dialogRef: secondDialogRef } = useDocumentDialogMock({
      isLoading: true,
    })

    rerender(<DocumentDialog onValidateDocument={onValidateDocumentMock} />)

    secondDialogRef.current?.open()

    expect(screen.queryByText('Buscar pedidos')).not.toBeTruthy()
    expect(screen.getByTestId('spinner')).toBeTruthy()
  })

  it('should call handleSubmit function on press submit button', async () => {
    const { dialogRef, handleSubmitMock } = useDocumentDialogMock({
      isLoading: false,
    })

    render(<DocumentDialog onValidateDocument={onValidateDocumentMock} />)

    act(() => {
      dialogRef.current?.open()
    })

    const submitButton = screen.getByText('Buscar pedidos')

    fireEvent.press(submitButton)

    expect(handleSubmitMock).toHaveBeenCalled()
  })

  it('should handle tabs change on press one tab', async () => {
    const { dialogRef, handleTabsChangeMock } = useDocumentDialogMock({
      isLoading: false,
    })

    render(<DocumentDialog onValidateDocument={onValidateDocumentMock} />)

    act(() => {
      dialogRef.current?.open()
    })

    const tab = screen.getByTestId('tab-2')

    fireEvent.press(tab)

    expect(handleTabsChangeMock).toHaveBeenCalled()
  })

  it('should handle document change on change document input value', async () => {
    const { dialogRef, handleCpfChangeMock, handleCnpjChangeMock } =
      useDocumentDialogMock({
        isLoading: false,
      })

    render(<DocumentDialog onValidateDocument={onValidateDocumentMock} />)

    act(() => {
      dialogRef.current?.open()
    })

    const cpfInput = screen.getByTestId('cpf-input')
    const cpf = '12345678965'

    fireEvent.changeText(cpfInput, cpf)

    expect(handleCpfChangeMock).toHaveBeenCalledWith(cpf)

    const tab = screen.getByTestId('tab-2')
    fireEvent.press(tab)

    const cnpjInput = screen.getByTestId('cnpj-input')
    const cnpj = '123456789654567'

    fireEvent.changeText(cnpjInput, cnpj)

    expect(handleCnpjChangeMock).toHaveBeenCalledWith(cnpj)
  })
})
