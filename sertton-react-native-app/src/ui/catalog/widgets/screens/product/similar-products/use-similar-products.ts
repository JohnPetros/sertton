import { useCallback, useEffect, useState } from "react"

import type { Product } from "@/core/catalog/entities"
import { useRestContext } from "@/ui/shared/contexts/rest-context/rest-context"

export const useSimilarProducts = (productId: string) => {
  const { catalogService } = useRestContext()
  const [products, setProducts] = useState<readonly Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const load = useCallback(async () => {
    setIsLoading(true)
    const response = await catalogService.fetchSimilarProducts(productId)
    if (response.isSuccessful)
      setProducts(response.getBody().filter((product) => product.id !== productId))
    setIsLoading(false)
  }, [catalogService, productId])

  useEffect(() => {
    void load()
  }, [load])

  return { isLoading, products }
}
