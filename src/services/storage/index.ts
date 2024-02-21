import { IStorage } from "./interface/IStorage"

let storage: IStorage

export function injectStorageProvider(StorageProvider: () => IStorage) {
  storage = StorageProvider()
}

export function useStorage() {
  if (!storage) {
    throw new Error('useStorage must be used with a storage')
  }

  return storage
}
