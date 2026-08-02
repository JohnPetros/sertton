export interface StorageProvider {
  getItem(key: string): Promise<string | null>
  removeItem(key: string): Promise<void>
  setItem(key: string, value: string): Promise<void>
}

export interface SecureStorageProvider {
  deleteItem(key: string): Promise<void>
  getItem(key: string): Promise<string | null>
  setItem(key: string, value: string): Promise<void>
}

export interface ConnectivityProvider {
  getIsConnected(): Promise<boolean>
  subscribe(listener: (isConnected: boolean) => void): () => void
}

export interface LinkProvider {
  canOpen(url: string): Promise<boolean>
  open(url: string): Promise<void>
}

export interface ConfigProvider {
  get(key: string): string | undefined
  getRequired(key: string): string
}
