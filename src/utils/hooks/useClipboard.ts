// import * as Clipboard from 'expo-clipboard'

import { useToast } from '@/utils/hooks/useToast'

export function useClipboard(text: string, message: string) {
  const toast = useToast()

  async function copy() {
    try {
      // await Clipboard.setStringAsync(text)

      toast.show(message)
    } catch (error) {
      console.error(error)
      toast.show('Erro ao tentar copiar!', 'error')
    }
  }

  return {
    copy,
  }
}
