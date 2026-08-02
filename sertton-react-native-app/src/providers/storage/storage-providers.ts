import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from "expo-secure-store"

import type { SecureStorageProvider, StorageProvider } from "@/core/shared/interfaces/providers"

export const AsyncStorageProvider: StorageProvider = {
  getItem: AsyncStorage.getItem,
  removeItem: AsyncStorage.removeItem,
  setItem: AsyncStorage.setItem,
}
export const ExpoSecureStorageProvider: SecureStorageProvider = {
  deleteItem: SecureStore.deleteItemAsync,
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
}
export const readVersionedValue = async <Value>(
  storage: StorageProvider | SecureStorageProvider,
  key: string,
  version: number,
): Promise<Value | undefined> => {
  try {
    const raw = await storage.getItem(key)
    if (!raw) return undefined
    const parsed: unknown = JSON.parse(raw)
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      (parsed as { version?: unknown }).version !== version
    ) {
      await ("removeItem" in storage ? storage.removeItem(key) : storage.deleteItem(key))
      return undefined
    }
    return (parsed as { value: Value }).value
  } catch {
    await ("removeItem" in storage ? storage.removeItem(key) : storage.deleteItem(key))
    return undefined
  }
}
export const writeVersionedValue = <Value>(
  storage: StorageProvider | SecureStorageProvider,
  key: string,
  version: number,
  value: Value,
): Promise<void> => storage.setItem(key, JSON.stringify({ value, version }))
