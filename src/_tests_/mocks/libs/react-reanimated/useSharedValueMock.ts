import { SharedValue } from 'react-native-reanimated'

export function useSharedValueMock(initialValue: number) {
  let value = initialValue

  const sharedValue = {
    set value(newValue: number) {
      value = newValue
    },

    get value() {
      return value
    },
  }

  return sharedValue as SharedValue<number>
}
