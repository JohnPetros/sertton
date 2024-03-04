import { CartItem } from "@/@types/CartItem";
import { productsMock } from "./productsMock";

export const cartItemsMock: CartItem[] = [
  {
    slug: productsMock[0].slug,
    skuId: productsMock[0].skus[0].id,
    quantity: 1,
  },
  {
    slug: productsMock[1].slug,
    skuId: productsMock[1].skus[0].id,
    quantity: 2,
  },
  {
    slug: productsMock[2].slug,
    skuId: productsMock[2].skus[0].id,
    quantity: 3,
  },
]