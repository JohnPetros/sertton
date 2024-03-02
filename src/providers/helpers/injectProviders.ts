import { AxiosHttpProvider } from '@/services/api/http/axios'
import { injectHttpProvider } from '@/services/api/http'
import { injectDateProvider } from '@/services/date'
import { DayjsDateProvider } from '@/services/date/dayjs'
import { injectValidationProvider } from '@/services/validation'
import { ZodValidationProvider } from '@/services/validation/zod'
import { MmkvStorageProvider } from '@/services/storage/mmkv'
import { injectStorageProvider } from '@/services/storage'

export function injectProviders() {
  injectHttpProvider(AxiosHttpProvider)
  injectStorageProvider(MmkvStorageProvider)
  injectValidationProvider(ZodValidationProvider)
  injectDateProvider(DayjsDateProvider)
}