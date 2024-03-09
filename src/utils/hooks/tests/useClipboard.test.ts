import * as Clipboard from 'expo-clipboard';
import { useClipboard } from '../useClipboard';
import { renderHook } from '@/_tests_/customs/customRenderHook';
import { useToastMock } from '@/_tests_/mocks/hooks/useToastMock';

jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
}))

jest.mock('@/utils/hooks/useToast')

describe('useClipboard hook', () => {

  it('should copy a text to clipboard ', async () => {
    useToastMock()

    const text = 'Text mock'

    const { result } = renderHook(() => useClipboard(text, 'Text is copied'))

    await result.current.copy()

    expect(Clipboard.setStringAsync).toHaveBeenCalledWith(text)
  })

  it('should show a toast message on copy text', async () => {
    const { showMock } = useToastMock()

    const toastMessage = 'toast message mock'

    const { result } = renderHook(() => useClipboard('test to copy', toastMessage))

    await result.current.copy()

    expect(showMock).toHaveBeenCalledWith(toastMessage)
  })

  it('should show a toast message on copyinh operation failure', async () => {
    const { showMock } = useToastMock()

    // @ts-ignore
    Clipboard.setStringAsync.mockRejectedValue(undefined)

    const { result } = renderHook(() => useClipboard('test to copy', 'toast message'))

    await result.current.copy()

    expect(showMock).toHaveBeenCalledWith('Erro ao tentar copiar!', 'error')
  })

})
