import { useStorage } from '@/services/storage'
import { InMemoryStorageProvider } from '@/services/storage/in-memory'
import { InMemoryItem } from '@/services/storage/in-memory/types/InMemoryItem'

const mockedUseStorage = jest.mocked(useStorage)

export function useStorageMock(initialData: InMemoryItem[] = []) {
  mockedUseStorage.mockReturnValue(InMemoryStorageProvider())

  const storageMock = mockedUseStorage()

  if (initialData.length) {
    for (const data of initialData) {
      storageMock.setItem(data.key, data.value)
    }
  }

  return storageMock
}
