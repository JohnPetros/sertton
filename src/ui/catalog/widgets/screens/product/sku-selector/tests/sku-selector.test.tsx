import { fireEvent, render, screen } from "@testing-library/react-native"
import type { ReactNode } from "react"

import { SkuFaker } from "@/core/catalog/entities/fakers/sku-faker"
import { VariationFaker } from "@/core/catalog/entities/fakers/variation-faker"

import { SkuSelector } from "../index"

jest.mock("@/ui/shared/widgets/animated-modal", () => {
  const React = require("react") as typeof import("react")
  const { View } = require("react-native") as typeof import("react-native")

  return {
    AnimatedModal: ({ visible, children }: { visible: boolean; children: ReactNode }) =>
      visible ? React.createElement(View, null, children) : null,
  }
})

describe("SkuSelector", () => {
  const skus = [
    SkuFaker.fake({
      id: "sku-1",
      skuCode: "SKU-1",
      stock: 2,
      variations: [VariationFaker.fake({ name: "Size", value: "Small" })],
    }),
    SkuFaker.fake({
      id: "sku-2",
      skuCode: "SKU-2",
      stock: 5,
      variations: [VariationFaker.fake({ name: "Size", value: "Large" })],
    }),
  ]

  it("should disable quantity controls at the SKU limits", () => {
    render(
      <SkuSelector
        label="Size"
        quantity={2}
        selectedSku={skus[0]}
        skus={skus}
        onQuantityChange={jest.fn()}
        onSkuSelected={jest.fn()}
      />,
    )

    expect(screen.getByRole("button", { name: "Diminuir quantidade" })).toBeEnabled()
    expect(screen.getByRole("button", { name: "Aumentar quantidade" })).toBeDisabled()
    expect(screen.getByLabelText("Quantidade: 2")).toBeTruthy()
    expect(screen.getByText("Disponível: 2 unidades")).toBeTruthy()
  })

  it("should open options and delegate a selected SKU", () => {
    const onSkuSelected = jest.fn()
    render(
      <SkuSelector
        label="Size"
        quantity={1}
        selectedSku={skus[0]}
        skus={skus}
        onQuantityChange={jest.fn()}
        onSkuSelected={onSkuSelected}
      />,
    )

    fireEvent.press(screen.getByRole("button", { name: "Selecionar Size" }))
    expect(screen.getByText("Selecione o SIZE")).toBeTruthy()

    fireEvent.press(screen.getByRole("radio", { name: "Large" }))

    expect(onSkuSelected).toHaveBeenCalledWith(skus[1])
  })
})
