import { Product } from '@/@types/Product'
import { Sorter } from '@/@types/Sorter'

type getProductsParams = {
  page: number
  search: string
  sorter: Sorter | null
  categoryId: string
  brandsIds: string[]
}

export interface IProductsController {
  getProducts(
    params: getProductsParams
  ): Promise<{ products: Product[]; totalProductsCount: number, perPage: number }>
  getProductsByCollectionId(collectionId: string): Promise<Product[]>
  getProductBySlug(slug: string): Promise<Product | null>
  getSimiliarProducts(id: string): Promise<Product[]>
}
