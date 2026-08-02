import { fireEvent, render, screen } from "@testing-library/react-native"
import type { ReactNode } from "react"

import { BrandFaker } from "@/core/catalog/entities/fakers/brand-faker"
import { CategoryFaker } from "@/core/catalog/entities/fakers/category-faker"

import { FiltersBar } from "../index"

jest.mock("@/ui/shared/widgets/animated-modal", () => {
  const React = require("react") as typeof import("react")
  const { View } = require("react-native") as typeof import("react-native")

  return {
    AnimatedModal: ({ visible, children }: { visible: boolean; children: ReactNode }) =>
      visible ? React.createElement(View, null, children) : null,
  }
})

describe("FiltersBar", () => {
  const categories = [
    CategoryFaker.fake({ id: "category-1", name: "Bags", description: "<p>Carry items</p>" }),
  ]
  const brands = [BrandFaker.fake({ id: "brand-1", name: "Sertton" })]

  it("should display selected filters and clear them", () => {
    const onBrandsChange = jest.fn()
    const onCategoryChange = jest.fn()
    render(
      <FiltersBar
        brands={brands}
        brandsIds={["brand-1"]}
        categories={categories}
        categoryId="category-1"
        onBrandsChange={onBrandsChange}
        onCategoryChange={onCategoryChange}
      />,
    )

    expect(screen.getByText("Bags")).toBeTruthy()
    expect(screen.getByText("Marcas (1)")).toBeTruthy()
    fireEvent.press(screen.getByLabelText("Trash2"))

    expect(onCategoryChange).toHaveBeenCalledWith(undefined)
    expect(onBrandsChange).toHaveBeenCalledWith([])
  })

  it("should select a category from the category modal", () => {
    const onCategoryChange = jest.fn()
    render(
      <FiltersBar
        brands={brands}
        brandsIds={[]}
        categories={categories}
        onBrandsChange={jest.fn()}
        onCategoryChange={onCategoryChange}
      />,
    )

    fireEvent.press(screen.getByText("Categoria"))
    expect(screen.getByText("Categorias")).toBeTruthy()
    fireEvent.press(screen.getByText("Bags"))

    expect(onCategoryChange).toHaveBeenCalledWith("category-1")
  })
})
