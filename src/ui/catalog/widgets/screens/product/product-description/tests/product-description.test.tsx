import { render, screen } from "@testing-library/react-native"

import { ProductDescription } from "../index"

describe("ProductDescription", () => {
  it("should render both formatted sections", () => {
    render(
      <ProductDescription
        description="<p>Made for daily use</p>"
        specifications="<p>100% cotton</p>"
      />,
    )

    expect(screen.getByText("Descrição do produto")).toBeTruthy()
    expect(screen.getByText("Made for daily use")).toBeTruthy()
    expect(screen.getByText("Especificações técnicas")).toBeTruthy()
    expect(screen.getByText("100% cotton")).toBeTruthy()
  })

  it("should omit sections whose content is empty", () => {
    render(<ProductDescription description="" specifications="<p>Only specs</p>" />)

    expect(screen.queryByText("Descrição do produto")).toBeNull()
    expect(screen.getByText("Especificações técnicas")).toBeTruthy()
  })
})
