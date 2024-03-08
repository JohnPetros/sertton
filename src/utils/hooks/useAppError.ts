import { useCallback, useEffect, useState } from 'react'

export function useAppError(errorMessage = '') {
  const [message, setMessage] = useState(errorMessage)
  const [, setAppError] = useState()

  const throwAppError = useCallback((message: string) => {
    setAppError(() => {
      throw new Error(message)
    })
  }, [])

  function handleAppError(error: Error) {
    // console.warn(error)
  }

  useEffect(() => {
    if (errorMessage && !message) {
      if (!errorMessage) {
        setMessage('Erro desconhecido')
        return
      }

      setMessage(errorMessage)
    }
  }, [errorMessage, message])

  return {
    throwAppError,
    handleAppError,
    message,
  }
}
