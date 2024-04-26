import { useCallback, useRef, useState } from 'react'
import { useFocusEffect } from 'expo-router'

import type { PersonType } from '@/@types/Customer'

import type { DialogRef } from '@/components/shared/Dialog/types/DialogRef'

import { useApi } from '@/services/api'
import { useCache } from '@/services/cache'
import { useStorage } from '@/services/storage'

import { CACHE } from '@/utils/constants/cache'
import { STORAGE } from '@/utils/constants/storage'

export function useOrdersList(
  openDocumentDialog: VoidFunction | null,
  closeDocumentDialog: VoidFunction | null,
) {
  const [customerDocument, setCustomerDocument] = useState('')
  const [personType, setPersonType] = useState<PersonType>('legal')

  const api = useApi()
  const storage = useStorage()

  async function getOrders() {
    try {
      return await api.getProcessedOrdersByCustomerDocument(customerDocument)
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
    if (openDocumentDialog) {
      openDocumentDialog()
    }
  }

  const handleValidateDocument = useCallback(
    async (validatedDocument: string, personType: PersonType) => {
      await storage.setItem(
        STORAGE.keys.customer.document,
        `${personType}:${validatedDocument}`,
      )

      if (closeDocumentDialog) {
        closeDocumentDialog()
      }

      setCustomerDocument(validatedDocument)
      setPersonType(personType)
    },
    [storage, closeDocumentDialog],
  )

  useFocusEffect(
    useCallback(() => {
      async function getCustomerDocument() {
        const storagedcostumerDocument = await storage.getItem(
          STORAGE.keys.customer.document,
        )

        if (!storagedcostumerDocument) {
          if (openDocumentDialog) {
            openDocumentDialog()
          }
        } else if (!orders?.length) {
          const [personType, document] = storagedcostumerDocument.split(':')

          if (!personType || !document) {
            if (openDocumentDialog) {
              openDocumentDialog()
            }
            return
          }

          setPersonType(personType as PersonType)
          setCustomerDocument(document)

          if (closeDocumentDialog) {
            closeDocumentDialog()
          }
        }
      }

      getCustomerDocument()
    }, [orders, storage.getItem, openDocumentDialog, closeDocumentDialog]),
  )

  return {
    orders,
    isLoading,
    customerDocument,
    personType,
    handleValidateDocument,
    handleEditCustomerDocument,
  }
}
