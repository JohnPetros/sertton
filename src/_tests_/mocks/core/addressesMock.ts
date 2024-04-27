import type { Address } from '@/@types/Address'

export const addressesMock: Address[] = [
  {
    id: '1',
    receiver: 'John Doe',
    zipcode: '12345-678',
    street: 'Main Street',
    number: '123',
    neighborhood: 'Downtown',
    complement: 'Apt 4B',
    city: 'New York',
    uf: 'NY',
  },
  {
    id: '2',
    receiver: 'Jane Smith',
    zipcode: '98765-432',
    street: 'Broadway',
    number: '456',
    neighborhood: 'Uptown',
    city: 'Los Angeles',
    uf: 'CA',
  },
]
