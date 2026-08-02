import { create } from "zustand"

import type { Product } from "@/core/catalog/entities"

interface CatalogState {
  readonly selectedProduct: Product | undefined
  readonly searchTerm: string
  setSelectedProduct(product: Product | undefined): void
  setSearchTerm(searchTerm: string): void
}

export const useCatalogStore = create<CatalogState>((set) => ({
  selectedProduct: undefined,
  searchTerm: "",
  setSelectedProduct: (selectedProduct) => set({ selectedProduct }),
  setSearchTerm: (searchTerm) => set({ searchTerm }),
}))
