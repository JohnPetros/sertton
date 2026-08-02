import { render, screen } from "@testing-library/react-native"

import { ProductHeader } from "../index"

describe("ProductHeader", () => {
  it("should render the product SKU and title", () => {
    render(<ProductHeader skuCode="SKU-42" title="Everyday backpack" />)

    expect(screen.getByText("SKU: SKU-42")).toBeTruthy()
    expect(screen.getByText("Everyday backpack")).toBeTruthy()
  })
})
