import { router } from "expo-router"
import { useCallback, useEffect, useState } from "react"

import type { Collection, Product } from "@/core/catalog/entities"
import type { Payment } from "@/core/checkout/entities"
import type { Banner } from "@/core/marketing/entities"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

export interface HomeCollection {
  readonly collection: Collection
  readonly products: readonly Product[]
}

export const useHomeScreen = () => {
  const { catalogService, checkoutService, marketingService } = useRestContext()
  const [banners, setBanners] = useState<readonly Banner[]>([])
  const [collections, setCollections] = useState<readonly HomeCollection[]>([])
  const [payments, setPayments] = useState<readonly Payment[]>([])
  const [error, setError] = useState<string>()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<string>()

  const load = useCallback(async () => {
    setIsLoading(true)
    setError(undefined)
    const [bannersResponse, collectionsResponse, paymentsResponse] = await Promise.all([
      marketingService.fetchBanners(),
      catalogService.fetchCollections(),
      checkoutService.fetchPayments(),
    ])
    if (bannersResponse.isSuccessful) setBanners(bannersResponse.getBody())
    else setError("Não foi possível carregar o conteúdo da loja.")
    if (paymentsResponse.isSuccessful) setPayments(paymentsResponse.getBody())
    if (collectionsResponse.isSuccessful) {
      const availableCollections = collectionsResponse.getBody()
      const productResults = await Promise.all(
        availableCollections.map(async (collection) => ({
          collection,
          response: await catalogService.fetchProductsByCollection(collection.id),
        })),
      )
      setCollections(
        productResults.map((item) => ({
          collection: item.collection,
          products: item.response.isSuccessful ? item.response.getBody() : [],
        })),
      )
    } else setError("Não foi possível carregar o conteúdo da loja.")
    setIsLoading(false)
  }, [catalogService, checkoutService, marketingService])

  useEffect(() => {
    void load()
  }, [load])

  const onSearch = (query: string) => {
    if (query.trim()) router.push({ pathname: "/(main)/(tabs)/catalog", params: { query } })
  }

  const subscribe = async () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Informe um e-mail válido.")
      return
    }
    setIsSubmitting(true)
    const response = await marketingService.saveLead({ email })
    setMessage(
      response.isSuccessful
        ? "Cadastro realizado com sucesso!"
        : "Não foi possível realizar o cadastro.",
    )
    setIsSubmitting(false)
  }

  return {
    banners,
    collections,
    email,
    error,
    isLoading,
    isSubmitting,
    message,
    onSearch,
    payments,
    refresh: load,
    setEmail,
    subscribe,
  }
}
