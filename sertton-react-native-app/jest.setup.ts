jest.mock("expo-linking", () => ({
  canOpenURL: jest.fn(),
  openURL: jest.fn(),
}))

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock"),
)

jest.mock("react-native-reanimated", () => {
  const { View } = require("react-native")

  return {
    __esModule: true,
    default: { View },
    FadeIn: {},
    FadeOut: {},
  }
})

jest.mock("lucide-react-native", () => {
  const React = require("react")
  const { View } = require("react-native")

  return new Proxy(
    {},
    {
      get: (_, iconName) => (props: object) =>
        React.createElement(View, { accessibilityLabel: String(iconName), ...props }),
    },
  )
})
