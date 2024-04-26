import { MMKV } from 'react-native-mmkv'

import { IStorage } from '../interfaces/IStorage'

import { STORAGE } from '@/utils/constants/storage'

const storage = new MMKV({ id: STORAGE.id })

export const MmkvStorageProvider = (): IStorage => {
  return {
    async getItem(key: string): Promise<string | null> {
      const item = storage.getString(key)
      return item ?? null
    },

    async setItem(key: string, value: string) {
      storage.set(key, value)
    },

    async removeItem(key: string) {
      storage.delete(key)
    },
  }
}
