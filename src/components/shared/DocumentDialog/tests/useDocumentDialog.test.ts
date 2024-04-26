import { renderHook } from '@/_tests_/customs/customRenderHook'
import { useDocumentDialog } from '../useDocumentDialog'
import { act } from '@testing-library/react-native'
import { Keyboard } from 'react-native'
import { injectValidationProvider } from '@/services/validation'
import { ZodValidationProvider } from '@/services/validation/zod'
import { VALIDATION_ERRORS } from '@/services/validation/constants/validation-errors'

const onValidateDocumentMock = jest.fn()
const dismissKeyboardMock = jest.fn()

describe('useDocumentDialog hook', () => {
  beforeAll(() => {
    injectValidationProvider(ZodValidationProvider)
  })

  it('should change customer document', () => {
    const { result } = renderHook(() =>
      useDocumentDialog(onValidateDocumentMock, dismissKeyboardMock),
    )

    const cpf = 'cpf mock'
    const cnpj = 'cnpj mock'

    act(() => {
      result.current.handleCpfChange(cpf)
    })
    act(() => {
      result.current.handleCnpjChange(cnpj)
    })

    expect(result.current.cpf).toBe(cpf)
    expect(result.current.cnpj).toBe(cnpj)
  })

  it('should change person type on change tabs', () => {
    const { result } = renderHook(() =>
      useDocumentDialog(onValidateDocumentMock, dismissKeyboardMock),
    )

    expect(result.current.personType).toBe('natural')

    act(() => {
      result.current.handleTabsChange('legal')
    })

    expect(result.current.personType).toBe('legal')
  })

  it('should dismiss keyboard on submit', () => {
    const { result } = renderHook(() =>
      useDocumentDialog(onValidateDocumentMock, dismissKeyboardMock),
    )

    act(() => {
      result.current.handleSubmit()
    })

    expect(dismissKeyboardMock).toHaveBeenCalled()
  })

  it('should set error if customer document is not valid', () => {
    const { result } = renderHook(() =>
      useDocumentDialog(onValidateDocumentMock, dismissKeyboardMock),
    )

    act(() => {
      result.current.handleCpfChange('wrong cpf')
    })

    act(() => {
      result.current.handleSubmit()
    })

    expect(result.current.error).toBe(VALIDATION_ERRORS.cpf.length)
  })

  it('should pass customer document to on validate document callback if it is valid and according to the document type', () => {
    const { result, rerender } = renderHook(() =>
      useDocumentDialog(onValidateDocumentMock, dismissKeyboardMock),
    )

    const validCpf = '12345678912'

    act(() => {
      result.current.handleCpfChange('12345678912')
    })

    act(() => {
      result.current.handleSubmit()
    })

    expect(onValidateDocumentMock).toHaveBeenCalledWith(validCpf, 'natural')

    rerender(null)

    onValidateDocumentMock.mockClear()
    dismissKeyboardMock.mockClear()

    const validCnpj = '12345678912345'

    act(() => {
      result.current.handleTabsChange('legal')
    })

    act(() => {
      result.current.handleCnpjChange(validCnpj)
    })

    act(() => {
      result.current.handleSubmit()
    })

    expect(onValidateDocumentMock).toHaveBeenCalledWith(validCnpj, 'legal')

    expect(result.current.error).toBe('')
  })
})
