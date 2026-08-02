import type { CartItem } from "@/core/checkout/entities"
import type { SecureStorageProvider, StorageProvider } from "@/core/shared/interfaces/providers"
import { readVersionedValue, writeVersionedValue } from "@/providers/storage/storage-providers"

const CART_KEY = "sertton.cart"
const CUSTOMER_DOCUMENT_KEY = "sertton.customer-document"
const STORAGE_VERSION = 1

export const SerttonStorage = (storage: StorageProvider, secureStorage: SecureStorageProvider) => ({
  clearCart: () => storage.removeItem(CART_KEY),
  clearCustomerDocument: () => secureStorage.deleteItem(CUSTOMER_DOCUMENT_KEY),
  readCart: () => readVersionedValue<readonly CartItem[]>(storage, CART_KEY, STORAGE_VERSION),
  readCustomerDocument: () =>
    readVersionedValue<string>(secureStorage, CUSTOMER_DOCUMENT_KEY, STORAGE_VERSION),
  saveCart: (items: readonly CartItem[]) =>
    writeVersionedValue(storage, CART_KEY, STORAGE_VERSION, items),
  saveCustomerDocument: (document: string) =>
    writeVersionedValue(secureStorage, CUSTOMER_DOCUMENT_KEY, STORAGE_VERSION, document),
})
