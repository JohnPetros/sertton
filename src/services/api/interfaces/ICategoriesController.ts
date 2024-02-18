import type { Category } from '@/@types/Category'

export interface ICategoriesController {
  getCategories(): Promise<Category[]>
  getCategoryById(categoryId: string): Promise<Category | null>
}
