import { useSelect } from "../../useSelect"

const openMock = jest.fn()
const error = false
const isOpen = false
const isLoading = false
const selectedValue = 'selected value'

export function useSelectMock(returnMock?: Partial<ReturnType<typeof useSelect>>) {
  jest.mocked(useSelect).mockReturnValueOnce({
    open: openMock,
    close: jest.fn(),
    reset: jest.fn(),
    handleOpenChange: jest.fn(),
    handleChangeValue: jest.fn(),
    error,
    isOpen,
    isLoading,
    selectedValue,
    ...returnMock,
  })

  return {
    error,
    isOpen,
    isLoading,
    selectedValue,
    openMock,
  }
}
