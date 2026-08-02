import { fireEvent, render, screen } from "@testing-library/react-native"

import { OrderFaker } from "@/core/checkout/entities/fakers/order-faker"
import { DocumentType } from "@/core/shared/rules/document"

import { OrdersScreen } from "../index"
import { useOrdersScreen } from "../use-orders-screen"

jest.mock("../use-orders-screen", () => ({
  useOrdersScreen: jest.fn(),
}))

jest.mock("@/ui/shared/widgets/app-header", () => ({
  AppHeader: () => null,
}))

const useOrdersScreenMock = jest.mocked(useOrdersScreen)

describe("OrdersScreen", () => {
  const fetchOrders = jest.fn()
  const setDocument = jest.fn()
  const setDocumentType = jest.fn()
  const toggleOrder = jest.fn()

  const createState = (overrides: Partial<ReturnType<typeof useOrdersScreen>> = {}) => ({
    document: "",
    documentType: DocumentType.cpf,
    error: undefined,
    expandedOrderNumber: undefined,
    fetchOrders,
    formattedDocument: "",
    isDocumentValid: false,
    isIdentified: false,
    isLoading: false,
    logout: jest.fn(),
    orders: undefined,
    setDocument,
    setDocumentType,
    toggleOrder,
    ...overrides,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    useOrdersScreenMock.mockReturnValue(createState())
  })

  it("should delegate document input and type selection", () => {
    render(<OrdersScreen />)

    fireEvent.changeText(screen.getByLabelText("CPF"), "12345678909")
    const cpfOption = screen.getAllByRole("radio")[0]
    if (!cpfOption) throw new Error("CPF option was not rendered")
    fireEvent.press(cpfOption)

    expect(setDocument).toHaveBeenCalledWith("12345678909")
    expect(setDocumentType).toHaveBeenCalledWith(DocumentType.cpf)
    expect(screen.getByRole("button", { name: "Buscar pedidos" })).toBeDisabled()
  })

  it("should render the identified loading state", () => {
    useOrdersScreenMock.mockReturnValue(
      createState({
        document: "12345678909",
        formattedDocument: "123.456.789-09",
        isDocumentValid: true,
        isIdentified: true,
        isLoading: true,
        orders: [],
      }),
    )

    render(<OrdersScreen />)

    expect(screen.getAllByText("Buscando pedidos...").length).toBeGreaterThan(0)
    expect(screen.getByRole("button", { name: "Buscar pedidos" })).toBeDisabled()
  })

  it("should render an empty identified result", () => {
    useOrdersScreenMock.mockReturnValue(
      createState({ isDocumentValid: true, isIdentified: true, orders: [] }),
    )

    render(<OrdersScreen />)

    expect(screen.getByText("Nenhum pedido encontrado para este documento.")).toBeOnTheScreen()
  })

  it("should render an error result and delegate retry", () => {
    useOrdersScreenMock.mockReturnValue(
      createState({
        error: "Orders failed",
        isDocumentValid: true,
        isIdentified: true,
        orders: [OrderFaker.fake({ number: "2000" })],
      }),
    )

    render(<OrdersScreen />)
    fireEvent.press(screen.getByRole("button", { name: "Tentar novamente" }))

    expect(screen.getByText("Orders failed")).toBeOnTheScreen()
    expect(fetchOrders).toHaveBeenCalledTimes(1)
  })

  it("should render orders and delegate search and expansion", () => {
    useOrdersScreenMock.mockReturnValue(
      createState({
        document: "12345678909",
        formattedDocument: "123.456.789-09",
        isDocumentValid: true,
        isIdentified: true,
        orders: [OrderFaker.fake({ number: "2000" })],
      }),
    )

    render(<OrdersScreen />)

    fireEvent.press(screen.getByRole("button", { name: "Buscar pedidos" }))
    fireEvent.press(screen.getByRole("button", { name: "Pedido 2000" }))

    expect(fetchOrders).toHaveBeenCalledTimes(1)
    expect(toggleOrder).toHaveBeenCalledWith("2000")
  })
})
