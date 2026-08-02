import { useCallback, useEffect, useMemo, useState } from "react"

import type { Order } from "@/core/checkout/entities"
import {
  DocumentType,
  formatDocument,
  getDocumentType,
  sanitizeDocument,
} from "@/core/shared/rules/document"
import { ExpoSecureStorageProvider } from "@/providers/storage/storage-providers"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

const documentKey = "sertton.customer-document"

export const useOrdersScreen = () => {
  const { checkoutService } = useRestContext()
  const [document, setDocumentValue] = useState("")
  const [documentType, setDocumentTypeValue] = useState(DocumentType.cpf)
  const [expandedOrderNumber, setExpandedOrderNumber] = useState<string>()
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState<readonly Order[]>()

  const fetchOrdersByDocument = useCallback(
    async (documentValue: string) => {
      const value = sanitizeDocument(documentValue)
      if (!getDocumentType(value)) {
        setError("Informe um CPF ou CNPJ válido.")
        return
      }

      setIsLoading(true)
      setError(undefined)
      try {
        const response = await checkoutService.fetchOrdersByCustomer(value)
        if (response.isFailure) setError("Não foi possível consultar os pedidos.")
        else {
          setOrders(
            [...response.getBody()].sort(
              (first, second) => second.createdAt.getTime() - first.createdAt.getTime(),
            ),
          )
          await ExpoSecureStorageProvider.setItem(documentKey, value)
        }
      } catch {
        setError("Não foi possível consultar os pedidos. Tente novamente.")
      } finally {
        setIsLoading(false)
      }
    },
    [checkoutService],
  )

  useEffect(() => {
    void ExpoSecureStorageProvider.getItem(documentKey).then((stored) => {
      if (!stored) return
      setDocumentValue(stored)
      const type = getDocumentType(stored)
      if (type) setDocumentTypeValue(type)
      void fetchOrdersByDocument(stored)
    })
  }, [fetchOrdersByDocument])

  const fetchOrders = useCallback(
    () => fetchOrdersByDocument(document),
    [document, fetchOrdersByDocument],
  )

  const setDocument = useCallback((value: string) => {
    setDocumentValue(sanitizeDocument(value))
    setError(undefined)
  }, [])

  const setDocumentType = useCallback((type: DocumentType) => {
    setDocumentTypeValue(type)
    setDocumentValue("")
    setError(undefined)
  }, [])

  const logout = useCallback(async () => {
    await ExpoSecureStorageProvider.deleteItem(documentKey)
    setDocumentValue("")
    setOrders(undefined)
    setError(undefined)
    setExpandedOrderNumber(undefined)
  }, [])

  const isDocumentValid = getDocumentType(document) === documentType
  const formattedDocument = useMemo(() => formatDocument(document), [document])

  return {
    document,
    documentType,
    error,
    expandedOrderNumber,
    fetchOrders,
    formattedDocument,
    isDocumentValid,
    isIdentified: orders !== undefined,
    isLoading,
    logout,
    orders,
    setDocument,
    setDocumentType,
    toggleOrder: (number: string) =>
      setExpandedOrderNumber((current) => (current === number ? undefined : number)),
  }
}
