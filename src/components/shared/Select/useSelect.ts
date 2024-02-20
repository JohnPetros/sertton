import { useEffect, useState } from 'react'

type DefaultValue = 'Selecionar'

export const DEFAULT_VALUE: DefaultValue = 'Selecionar'

export type SelectRef = {
  value: string
  reset: () => void
  open: () => void
}

export function useSelect(
  defaultValue: string,
  hasError = false,
  onChange: (value: string) => void
) {
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(hasError)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  function reset() {
    setSelectedValue(DEFAULT_VALUE)
  }

  function handleChangeValue(value: string) {
    setIsLoading(true)

    setSelectedValue(value)
  }

  function handleOpenChange(isOpen: boolean) {
    setIsOpen(isOpen)
  }

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsOpen(false)
        setIsLoading(false)
        setError(false)
        onChange(selectedValue)
      }, 50)
    }
  }, [isLoading, selectedValue, onChange])

  useEffect(() => {
    setError(hasError)
  }, [hasError])

  return {
    isLoading,
    selectedValue,
    isOpen,
    error,
    open,
    close,
    reset,
    handleChangeValue,
    handleOpenChange,
  }
}
