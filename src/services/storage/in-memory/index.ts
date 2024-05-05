import { IStorage } from '../interfaces/IStorage'
import { InMemoryItem } from './types/InMemoryItem'

export const InMemoryStorageProvider = (): IStorage => {
  let storage: InMemoryItem[] = []

  return {
    async getItem(key: string): Promise<string | null> {
      const item = storage.find((item) => item.key === key)
      return item?.value ?? null
    },

    async setItem(key: string, value: string) {
      storage.push({ key, value })
    },

    async removeItem(key: string) {
      storage = storage.filter((item) => item.key !== key)
    },
  }
}
