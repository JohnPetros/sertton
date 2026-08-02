import { fireEvent, render, screen } from "@testing-library/react-native"

import { ScaffoldScreen } from ".."

describe("ScaffoldScreen", () => {
  it("should toggle the animation validation state when the action is pressed", () => {
    render(<ScaffoldScreen />)

    fireEvent.press(screen.getByRole("button", { name: "Validar animação" }))

    expect(screen.getByText("Animação validada")).toBeOnTheScreen()
  })
})
