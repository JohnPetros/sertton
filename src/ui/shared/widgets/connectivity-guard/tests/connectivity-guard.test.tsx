import { render } from "@testing-library/react-native"
import { View } from "react-native"

import { ConnectivityGuard } from ".."

const mockReplace = jest.fn()
let mockPathname = "/"
let mockIsConnected: boolean | undefined

jest.mock("expo-router", () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ replace: mockReplace }),
}))

jest.mock("../use-connectivity-guard", () => ({
  useConnectivityGuard: () => ({ isConnected: mockIsConnected }),
}))

describe("ConnectivityGuard", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockPathname = "/"
    mockIsConnected = undefined
  })

  it("should redirect to Offline when connectivity is lost outside Splash", () => {
    mockIsConnected = false

    render(
      <ConnectivityGuard>
        <View />
      </ConnectivityGuard>,
    )

    expect(mockReplace).toHaveBeenCalledWith("/offline")
  })

  it("should return to Home when connectivity is restored on Offline", () => {
    mockPathname = "/offline"
    mockIsConnected = true

    render(
      <ConnectivityGuard>
        <View />
      </ConnectivityGuard>,
    )

    expect(mockReplace).toHaveBeenCalledWith("/")
  })

  it("should not redirect while Splash is active or when already Offline", () => {
    mockPathname = "/splash"
    mockIsConnected = false

    const { rerender } = render(
      <ConnectivityGuard>
        <View />
      </ConnectivityGuard>,
    )

    mockPathname = "/offline"
    rerender(
      <ConnectivityGuard>
        <View />
      </ConnectivityGuard>,
    )

    expect(mockReplace).not.toHaveBeenCalled()
  })
})
