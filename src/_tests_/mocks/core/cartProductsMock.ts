import type { CartProduct } from '@/@types/CartProduct'
import { productsMock } from '@/_tests_/mocks/core/productsMock'

export const cartProductsMock: CartProduct[] = [
  {
    ...productsMock[0],
    quantity: 1,
    selectedSkuId: '111',
  },
  {
    ...productsMock[1],
    quantity: 2,
    selectedSkuId: '222',
  },
  {
    ...productsMock[2],
    quantity: 3,
    selectedSkuId: '333',
  },
  {
    ...productsMock[3],
    quantity: 4,
    selectedSkuId: '444',
  },
  {
    ...productsMock[4],
    quantity: 5,
    selectedSkuId: '555',
  },
]
