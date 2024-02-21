import { Sku } from "@/@types/Sku";

export const skusMock: Sku[] = [
  {
    id: 'sku1',
    skuCode: 'code1',
    costPrice: 10,
    salePrice: 15,
    discountPrice: 5,
    weight: 1,
    height: 10,
    width: 10,
    length: 10,
    imageUrl: 'http://example.com/sku1.jpg',
    variations: [
      { id: 'var1', name: 'Variation  1', value: 'Variation 1 value' },
      { id: 'var2', name: 'Variation  2', value: 'Variation 2 value' },
    ],
    stock: 100,
    yampiToken: 'token1',
  },
  {
    id: 'sku2',
    skuCode: 'code2',
    costPrice: 20,
    salePrice: 30,
    discountPrice: 10,
    weight: 2,
    height: 20,
    width: 20,
    length: 20,
    imageUrl: 'http://example.com/sku2.jpg',
    variations: [
      { id: 'var3', name: 'Variation  3', value: 'Variation 3 value' },
      { id: 'var4', name: 'Variation  4', value: 'Variation 4 value' },
    ],
    stock: 200,
    yampiToken: 'token2',
  },
  // Add more mock Sku objects as needed
];