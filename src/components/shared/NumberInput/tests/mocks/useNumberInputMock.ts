import { useNumberInput } from "../../useNumberInput"

const numberValue = 1

const handleDecreaseValueMock = jest.fn()
const handleIncreaseValueMock = jest.fn()
const handleInputValueChangeMock = jest.fn()

export function useNumberInputMock(mock?: Partial<ReturnType<typeof useNumberInput>>) {
  jest.mocked(useNumberInput).mockReturnValueOnce({
    handleDecreaseValue: handleDecreaseValueMock,
    handleIncreaseValue: handleIncreaseValueMock,
    handleInputValueChange: handleInputValueChangeMock,
    numberValue,
    ...mock,
  })

  return {
    handleDecreaseValueMock,
    handleIncreaseValueMock,
    handleInputValueChangeMock,
  }
}
