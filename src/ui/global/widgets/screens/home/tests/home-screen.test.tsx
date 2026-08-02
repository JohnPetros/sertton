import { fireEvent, render, screen } from "@testing-library/react-native"
import { HomeScreen } from "../index"
import { useHomeScreen } from "../use-home-screen"

jest.mock("../product-card", () => ({
  ProductCard: () => null,
}))

jest.mock("../use-home-screen", () => ({
  useHomeScreen: jest.fn(),
}))

const useHomeScreenMock = jest.mocked(useHomeScreen)

describe("HomeScreen", () => {
  const refresh = jest.fn()
  const setEmail = jest.fn()
  const subscribe = jest.fn()
  const onSearch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useHomeScreenMock.mockReturnValue({
      banners: [],
      collections: [],
      email: "",
      error: undefined,
      isLoading: false,
      isSubmitting: false,
      message: undefined,
      onSearch,
      payments: [],
      refresh,
      setEmail,
      subscribe,
    })
  })

  it("should render the loading state", () => {
    useHomeScreenMock.mockReturnValue({
      banners: [],
      collections: [],
      email: "",
      error: undefined,
      isLoading: true,
      isSubmitting: false,
      message: undefined,
      onSearch,
      payments: [],
      refresh,
      setEmail,
      subscribe,
    })

    render(<HomeScreen />)

    expect(screen.getAllByLabelText("Carregando").length).toBeGreaterThan(0)
  })

  it("should render the error state and delegate retry", () => {
    useHomeScreenMock.mockReturnValue({
      banners: [],
      collections: [],
      email: "",
      error: "Não foi possível carregar o conteúdo da loja.",
      isLoading: false,
      isSubmitting: false,
      message: undefined,
      onSearch,
      payments: [],
      refresh,
      setEmail,
      subscribe,
    })

    render(<HomeScreen />)
    fireEvent.press(screen.getByRole("button", { name: "Tentar novamente" }))

    expect(screen.getByText("Não foi possível carregar o conteúdo da loja.")).toBeOnTheScreen()
    expect(refresh).toHaveBeenCalledTimes(1)
  })

  it("should delegate newsletter input and subscription", () => {
    render(<HomeScreen />)

    fireEvent.changeText(screen.getByLabelText("Digite seu melhor e-mail"), "cliente@example.com")
    fireEvent.press(screen.getByRole("button", { name: "Inscreva-se na newsletter" }))

    expect(setEmail).toHaveBeenCalledWith("cliente@example.com")
    expect(subscribe).toHaveBeenCalledTimes(1)
  })
})
