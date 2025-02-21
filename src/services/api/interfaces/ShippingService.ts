import type { ProcessedSku } from '@/@types/ProcessedSku'
import type { ShippingQuote } from '@/@types/ShippingQuote'

export interface ShippingService {
  calculateShippingQuotes(
    zipcode: string,
    processedSkus: ProcessedSku[],
  ): Promise<ShippingQuote[]>
}
