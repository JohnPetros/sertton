import { useState } from 'react'


import { useApi } from '@/services/api'
import { useValidation } from '@/services/validation'
// import { useToast } from '@/utils/hooks/useToast'

export function useLeadsCapture() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const api = useApi()
  // const toast = useToast()
  const validation = useValidation()

  async function handleSubmit() {
    const emailValidation = validation.validateEmail(email)

    if (emailValidation.isValid) {
      try {
        await api.saveLead(email)
        setIsLoading(true)
        // toast.show(MESSAGES.successSubmit, 'success')
      } catch (error) {
        const { errors } = api.handleError<{
          errors: { email: string[] }
        }>(error)

        // toast.show(errors.email[0], 'error')
      } finally {
        setIsLoading(false)
      }
    } else {
      setError('E-mail inválido')
    }
  }

  function handleEmailChange(value: string) {
    setEmail(value)
    setError('')
  }

  return {
    email,
    error,
    isLoading,
    handleSubmit,
    handleEmailChange,
  }
}
