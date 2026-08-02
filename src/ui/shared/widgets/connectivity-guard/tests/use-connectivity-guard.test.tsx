import { act, renderHook } from "@testing-library/react-native"

import { NetInfoConnectivityProvider } from "@/providers/connectivity/net-info-connectivity-provider"

import { useConnectivityGuard } from "../use-connectivity-guard"

jest.mock("@/providers/connectivity/net-info-connectivity-provider", () => ({
  NetInfoConnectivityProvider: {
    getIsConnected: jest.fn(),
    subscribe: jest.fn(),
  },
}))

const connectivityProviderMock = jest.mocked(NetInfoConnectivityProvider)

describe("useConnectivityGuard", () => {
  const unsubscribe = jest.fn()
  let connectivityListener: ((isConnected: boolean) => void) | undefined

  beforeEach(() => {
    jest.clearAllMocks()
    connectivityListener = undefined
    connectivityProviderMock.getIsConnected.mockResolvedValue(true)
    connectivityProviderMock.subscribe.mockImplementation((listener) => {
      connectivityListener = listener
      return unsubscribe
    })
  })

  it("should expose the initial connectivity state when the provider resolves", async () => {
    const { result } = renderHook(() => useConnectivityGuard())

    await act(async () => undefined)

    expect(result.current.isConnected).toBe(true)
  })

  it("should update the connectivity state when the provider emits a change", async () => {
    const { result } = renderHook(() => useConnectivityGuard())

    await act(async () => undefined)
    await act(() => {
      connectivityListener?.(false)
    })

    expect(result.current.isConnected).toBe(false)
  })

  it("should unsubscribe from connectivity changes when unmounted", () => {
    const { unmount } = renderHook(() => useConnectivityGuard())

    unmount()

    expect(unsubscribe).toHaveBeenCalledTimes(1)
  })
})
