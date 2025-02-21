import type { ProcessedOrder } from '@/@types/ProcessedOrder'

export const processedOrdersMock: ProcessedOrder[] = [
  {
    status: {
      name: 'Cancelled',
      alias: 'cxl',
    },
    number: 12348,
    shipmentService: {
      name: 'Express Delivery',
      price: 15.99,
    },
    shippingAddress: {
      street: '123 Main St',
      city: 'Anytown',
      complement: 'Apt   4B',
      zipcode: '12345-6789',
      uf: 'XY',
      number: 4,
      neighborhood: 'Central',
      deliveryDays: 3,
      deliveryDate: '2025-02-21',
      receiver: 'John Doe',
    },
    products: [
      {
        id: 4,
        quantity: 1,
        price: 19.99,
        sku: {
          id: 'sku-876',
          name: 'Fourth Product',
          skuCode: 'FP876',
          salePrice: 18.99,
          discountPrice: 16.99,
        },
      },
    ],
    payment: {
      name: 'Credit Card',
      icon: 'cc-icon.png',
      pdf: null,
      method: 'credit-card',
    },
    createdAt: '2025-02-15T10:00:00Z',
  },
  {
    status: {
      name: 'Returned',
      alias: 'ret',
    },
    number: 12349,
    shipmentService: {
      name: 'Standard Delivery',
      price: 5.99,
    },
    shippingAddress: {
      street: '456 Elm St',
      city: 'Othertown',
      zipcode: '67890-1234',
      uf: 'ZY',
      number: 10,
      neighborhood: 'South',
      deliveryDays: 5,
      deliveryDate: '2025-02-22',
      receiver: 'Jane Smith',
    },
    products: [
      {
        id: 5,
        quantity: 2,
        price: 14.99,
        sku: {
          id: 'sku-987',
          name: 'Fifth Product',
          skuCode: 'FP987',
          salePrice: 12.99,
          discountPrice: 9.99,
        },
      },
    ],
    payment: {
      name: 'Debit Card',
      icon: 'dc-icon.png',
      pdf: 'path/to/debit-card-invoice.pdf',
      method: 'ticket',
    },
    createdAt: '2025-02-14T10:00:00Z',
  },
  {
    status: {
      name: 'Refunded',
      alias: 'ref',
    },
    number: 12350,
    shipmentService: {
      name: 'Overnight Delivery',
      price: 29.99,
    },
    shippingAddress: {
      street: '789 Oak St',
      city: 'Thirdtown',
      zipcode: '12345-6789',
      uf: 'AB',
      number: 12,
      neighborhood: 'North',
      deliveryDays: 1,
      deliveryDate: '2025-02-20',
      receiver: 'Alice Johnson',
    },
    products: [
      {
        id: 6,
        quantity: 1,
        price: 29.99,
        sku: {
          id: 'sku-654',
          name: 'Sixth Product',
          skuCode: 'SP654',
          salePrice: 24.99,
          discountPrice: 20.99,
        },
      },
    ],
    payment: {
      name: 'Cash on Delivery',
      icon: 'cod-icon.png',
      pdf: null,
      method: 'credit-card',
    },
    createdAt: '2025-02-13T10:00:00Z',
  },
]
