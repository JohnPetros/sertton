import { createContext, type PropsWithChildren, useContext, useMemo } from "react"
import type { ICatalogService } from "@/core/catalog/interfaces/catalog-service"
import type { ICheckoutService } from "@/core/checkout/interfaces/checkout-service"
import type { IMarketingService } from "@/core/marketing/interfaces/marketing-service"
import { ExpoCatalogService } from "@/rest/expo/services/expo-catalog-service"
import { ExpoCheckoutService } from "@/rest/expo/services/expo-checkout-service"
import { ExpoMarketingService } from "@/rest/expo/services/expo-marketing-service"
export interface RestContextValue {
  readonly catalogService: ICatalogService
  readonly checkoutService: ICheckoutService
  readonly marketingService: IMarketingService
}
export const RestContext = createContext<RestContextValue | undefined>(undefined)
export const RestContextProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo<RestContextValue>(
    () => ({
      catalogService: ExpoCatalogService(),
      checkoutService: ExpoCheckoutService(),
      marketingService: ExpoMarketingService(),
    }),
    [],
  )
  return <RestContext.Provider value={value}>{children}</RestContext.Provider>
}
export const useRestContext = (): RestContextValue => {
  const context = useContext(RestContext)
  if (!context) throw new Error("useRestContext must be used within RestContextProvider")
  return context
}
