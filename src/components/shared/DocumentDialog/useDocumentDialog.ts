import { useRef, useState } from 'react'

import type { PersonType } from '@/@types/Customer'
import type { DialogRef } from '@/components/shared/Dialog/types/DialogRef'
import { useValidation } from '@/services/validation'

export function useDocumentDialog(
  onValidateDocument: (
    validatedDocument: string,
    personType: PersonType
  ) => Promise<void>
) {
  const [cpf, setCpf] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [personType, setPersonType] = useState<PersonType>('natural')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const dialogRef = useRef<DialogRef | null>(null)

  const validation = useValidation()

  function open() {
    dialogRef.current?.open()
  }

  function close() {
    dialogRef.current?.close()
  }

  function handleCpfChange(value: string) {
    setCpf(value)
    setError('')
  }

  function handleCnpjChange(value: string) {
    setCnpj(value)
    setError('')
  }

  function handleTabsChange(personType: string) {
    setPersonType(personType as PersonType)
    setError('')
  }

  async function handleSubmit() {
    const documentValidation =
      personType === 'natural'
        ? validation.validateCpf(cpf)
        : validation.validateCnpj(cnpj)

    console.log({ personType })

    if (documentValidation.isValid) {
      try {
        setIsLoading(true)

        await onValidateDocument(personType === 'natural' ? cpf : cnpj, personType)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    } else {
      setError(documentValidation.errors[0])
    }
  }

  return {
    cpf,
    cnpj,
    error,
    personType,
    isLoading,
    dialogRef,
    open,
    close,
    handleSubmit,
    handleCpfChange,
    handleCnpjChange,
    handleTabsChange,
  }
}
