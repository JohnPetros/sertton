import { ShippingQuote } from '@/@types/ShippingQuote'

export const shippingQuotesMock: ShippingQuote[] = [
  {
    name: 'Express Delivery',
    service: 'Fastest',
    price: 15.99,
    days: 1,
  },
  {
    name: 'Standard Delivery',
    service: 'Regular',
    price: 10.99,
    days: 3,
  },
  {
    name: 'Economy Delivery',
    service: 'Cheapest',
    price: 5.99,
    days: 5,
  },
]
