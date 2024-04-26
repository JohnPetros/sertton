import { act, waitFor } from '@testing-library/react-native'

import { renderHook } from '@/_tests_/customs/customRenderHook'
import { useApiMock } from '@/_tests_/mocks/services/apiMock'

import { injectProviders } from '@/providers/helpers/injectProviders'
import { VALIDATION_ERRORS } from '@/services/validation/constants/validation-errors'

import { useLeadsCapture } from '../useLeadsCapture'
import { useToastMock } from '@/_tests_/mocks/hooks/useToastMock'
import { MESSAGES } from '../constants/messages'

jest.mock('@/services/api')
jest.mock('@/services/storage')
jest.mock('@/utils/hooks/useToast')

describe('useLeadsCapture hook', () => {
  beforeAll(() => {
    injectProviders()
  })

  it('should change email value', () => {
    useToastMock()

    const { result } = renderHook(useLeadsCapture)

    const email = 'email mock'

    act(() => {
      result.current.handleEmailChange(email)
    })

    expect(result.current.email).toBe(email)
    expect(result.current.error).toBe('')
  })

  it('should return error on submit if the provided email is not valid', async () => {
    useToastMock()

    const { result } = renderHook(useLeadsCapture)

    const email = 'invalid email'

    await act(async () => {
      result.current.handleEmailChange(email)
      result.current.handleSubmit()
    })

    expect(result.current.error).toBe(VALIDATION_ERRORS.email.regex)
  })

  it('should save lead if the provided email is valid', async () => {
    useToastMock()

    const apiMock = useApiMock()

    const { result } = renderHook(useLeadsCapture)

    const email = 'joaopcarvalho.cds@gmail.com'

    act(() => {
      result.current.handleEmailChange(email)
    })

    await waitFor(() => {
      result.current.handleSubmit()
    })

    const leads = await apiMock.getLeads()

    expect(leads).toEqual([{ email }])
  })

  it('should show toast with a success message if the email is valid', async () => {
    useApiMock()
    const { showMock } = useToastMock()

    const { result } = renderHook(useLeadsCapture)

    const email = 'joaopcarvalho.cds@gmail.com'

    act(() => {
      result.current.handleEmailChange(email)
    })

    await waitFor(() => {
      result.current.handleSubmit()
    })

    expect(showMock).toHaveBeenCalledWith(MESSAGES.successSubmit, 'success')
  })
})
