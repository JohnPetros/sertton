import { useState } from 'react'

export function useAlertDialog(onCancel: (() => void) | undefined) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen && onCancel) onCancel()
    setIsOpen(isOpen)
  }

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
  }

  return {
    isOpen,
    open,
    close,
    handleOpenChange,
  }
}
