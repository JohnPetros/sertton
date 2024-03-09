import { renderHook } from "@/_tests_/customs/customRenderHook"
import { useAppError } from "../useAppError"

describe('useAppError hooks', () => {
  it('should throw an error', () => {
    const { result } = renderHook(() => useAppError(''))

    const errorMessage = 'error message mock'

    expect(() => {
      result.current.throwAppError(errorMessage)

    }).toThrow(errorMessage)
  })

  it('should set the error message', () => {
    const errorMessage = 'error message mock'


    const { result } = renderHook(() => useAppError(errorMessage))

    expect(result.current.message).toBe(errorMessage)
  })

  it('should set a default error', () => {
    const { result } = renderHook(() => useAppError(''))

    expect(result.current.message).toBe('Erro desconhecido')
  })
})
