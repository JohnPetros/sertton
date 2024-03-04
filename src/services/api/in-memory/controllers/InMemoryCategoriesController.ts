import { Category } from "@/@types/Category"

import { categoriesMock } from "@/_tests_/mocks/core/categoriesMock"

import { ICategoriesController } from "../../interfaces/ICategoriesController"

export function InMemoryCategoriesController(): ICategoriesController {
  const categories: Category[] = categoriesMock

  return {
    async getCategories() {
      return categories
    },

    async getCategoryById(categoryId) {
      return categories.find((category) => category.id === categoryId) ?? null
    },
  }
}
