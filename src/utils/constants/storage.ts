import { APP_PREFIX } from '@/utils/constants/app-prefix'

export const STORAGE = {
  id: '@sertton-storage',
  keys: {
    cart: `${APP_PREFIX}:cart`,
    customer: {
      document: `${APP_PREFIX}:customer.document`,
    },
  },
}
