import { useState } from "react"

export const useFiltersBar = () => {
  const [isBrandsModalVisible, setIsBrandsModalVisible] = useState(false)
  const [isCategoriesModalVisible, setIsCategoriesModalVisible] = useState(false)

  return {
    closeBrandsModal: () => setIsBrandsModalVisible(false),
    closeCategoriesModal: () => setIsCategoriesModalVisible(false),
    isBrandsModalVisible,
    isCategoriesModalVisible,
    openBrandsModal: () => setIsBrandsModalVisible(true),
    openCategoriesModal: () => setIsCategoriesModalVisible(true),
  }
}
