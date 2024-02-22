import { useFocusEffect } from 'expo-router'
import { useCallback, useRef, useState } from 'react'

import { PersonType } from '@/@types/Customer'
import type { DialogRef } from '@/components/shared/Dialog/types/DialogRef'
import { useApi } from '@/services/api'
import { useCache } from '@/services/cache'
import { useStorage } from '@/services/storage'

import { CACHE } from '@/utils/constants/cache'
import { STORAGE } from '@/utils/constants/storage'

export function useOrdersList() {
  const [customerDocument, setCustomerDocument] = useState('')
  const [personType, setPersonType] = useState<PersonType>('legal')
  const documentDialogRef = useRef<DialogRef | null>(null)

  const api = useApi()
  const storage = useStorage()

  async function getOrders() {
    try {
      return await api.getOrdersByCustomerDocument(customerDocument)
    } catch (error) {
      api.handleError(error)
    }
  }

  const { data: orders, isLoading } = useCache({
    key: CACHE.keys.orders,
    fetcher: getOrders,
    dependencies: [customerDocument],
    isEnabled: Boolean(customerDocument),
  })

  function handleEditCustomerDocument() {
    documentDialogRef.current?.open()
  }

  const handleValidateDocument = useCallback(
    async (validatedDocument: string, personType: PersonType) => {
      await storage.setItem(
        STORAGE.keys.customer.document,
        `${personType}:${validatedDocument}`
      )

      setCustomerDocument(validatedDocument)
      setPersonType(personType)

      documentDialogRef.current?.close()
    },
    [storage]
  )

  useFocusEffect(
    useCallback(() => {
      async function getCustomerDocument() {
        const storagedcostumerDocument = await storage.getItem(
          STORAGE.keys.customer.document
        )

        if (!storagedcostumerDocument) {
          documentDialogRef.current?.open()
        } else if (!orders) {
          const [personType, document] = storagedcostumerDocument.split(':')

          if (!personType || !document) {
            documentDialogRef.current?.open()
            return
          }

          setPersonType(personType as PersonType)
          setCustomerDocument(document)
          documentDialogRef.current?.close()
        }
      }

      getCustomerDocument()
    }, [orders, storage.getItem])
  )

  return {
    orders,
    isLoading,
    customerDocument,
    personType,
    documentDialogRef,
    handleValidateDocument,
    handleEditCustomerDocument,
  }
}
