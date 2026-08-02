import { fireEvent, render, screen } from "@testing-library/react-native"
import type { ReactNode } from "react"

import { ProductImageViewer } from "../index"

jest.mock("@/ui/shared/widgets/animated-modal", () => {
  const React = require("react") as typeof import("react")
  const { View } = require("react-native") as typeof import("react-native")

  return {
    AnimatedModal: ({ visible, children }: { visible: boolean; children: ReactNode }) =>
      visible ? React.createElement(View, null, children) : null,
  }
})

describe("ProductImageViewer", () => {
  it("should open and close the enlarged image", () => {
    render(<ProductImageViewer imageUrl="https://example.com/bag.png" productName="Canvas bag" />)

    fireEvent.press(screen.getByRole("button", { name: "Ampliar imagem de Canvas bag" }))
    expect(screen.getByLabelText("Imagem ampliada de Canvas bag")).toBeTruthy()

    fireEvent.press(screen.getByRole("button", { name: "Fechar imagem ampliada" }))
    expect(screen.queryByLabelText("Imagem ampliada de Canvas bag")).toBeNull()
  })
})
