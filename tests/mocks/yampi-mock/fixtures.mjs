import { faker } from "@faker-js/faker"

import { YampiBannerFaker } from "./fakers/yampi-banner-faker.mjs"
import { YampiCollectionFaker } from "./fakers/yampi-collection-faker.mjs"
import { YampiPaymentFaker } from "./fakers/yampi-payment-faker.mjs"
import { YampiProductFaker } from "./fakers/yampi-product-faker.mjs"

faker.seed(20260802)

export const createFixtures = () => {
  const collections = [
    YampiCollectionFaker.create({ id: 1, name: "Borrachas" }),
    YampiCollectionFaker.create({ id: 2, name: "Peças Sider" }),
  ]
  const products = [
    YampiProductFaker.create({ id: 101, name: "Produto Arramate" }),
    YampiProductFaker.create({ id: 102, name: "Produto Industrial" }),
  ]

  return {
    banners: [YampiBannerFaker.create({ id: 1, name: "Banner Home" })],
    collections,
    products,
    productsByCollection: new Map(collections.map((collection) => [collection.id, products])),
    payments: [
      YampiPaymentFaker.create({ id: 1, alias: "credit_card", name: "Cartão de crédito" }),
      YampiPaymentFaker.create({ id: 2, alias: "pix", name: "Pix", payment_method: "pix" }),
    ],
  }
}
