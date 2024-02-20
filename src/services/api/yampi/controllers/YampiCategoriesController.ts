import { IHttp } from "../../http/interfaces/IHttp"
import { ICategoriesController } from "../../interfaces/ICategoriesController"
import { YampiCategoryAdapter } from "../adapters/YampiCategoryAdapter"
import { ENDPOINTS } from "../constants/endpoints"
import { RESOURCES } from "../constants/resources"
import { YampiCategory } from "../types/YampiCategory"

export const YampiCategoriesController = (http: IHttp): ICategoriesController => {
  return {
    async getCategories() {
      const response = await http.get<{ data: YampiCategory[] }>(
        `/${RESOURCES.catalog}/${ENDPOINTS.category}`
      )

      console.log('categories', { response })

      return response.data.map(YampiCategoryAdapter)
    },

    async getCategoryById(categoryId: string) {
      const response = await http.get<{ data: YampiCategory }>(
        `/${RESOURCES.catalog}/${ENDPOINTS.category}/${categoryId}`
      )

      return YampiCategoryAdapter(response.data)
    },
  }
}