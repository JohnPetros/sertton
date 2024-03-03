import { act, fireEvent, screen } from '@testing-library/react-native'
import { View } from 'tamagui'

import { useSearch } from '../useSearch'

import { render } from '@/_tests_/customs/customRender'
import { Search } from '..'
import { TEST_IDS } from './constants/test-ids'

jest.mock('../useSearch.ts')

const handleSearchMock = jest.fn()
const setSearchValueMock = jest.fn()
const searchValueMock = 'bla'

describe('Search component', () => {
  beforeEach(() => {
    handleSearchMock.mockClear()
    setSearchValueMock.mockClear()
  })

  it('should render spinner when is loading', () => {
    const useSearchMock = jest.mocked(useSearch)

    useSearchMock.mockReturnValueOnce({
      isLoading: true,
      handleSearch: handleSearchMock,
      searchValue: searchValueMock,
      setSearchValue: setSearchValueMock,
    })

    render(<Search isFetching={true} />)

    expect(screen.getByTestId(TEST_IDS.spinner)).toBeTruthy()
  })

  it('should set search value on change input', () => {
    const useSearchMock = jest.mocked(useSearch)
    useSearchMock.mockReturnValueOnce({
      isLoading: false,
      handleSearch: handleSearchMock,
      searchValue: searchValueMock,
      setSearchValue: setSearchValueMock,
    })

    render(<Search isFetching={true} />)

    const input = screen.getByTestId(TEST_IDS.input)

    const newSearchValue = 'new serch value'

    fireEvent.changeText(input, newSearchValue)

    expect(setSearchValueMock).toHaveBeenCalledWith(newSearchValue)
  })

  it('should handle search on press button', () => {
    const useSearchMock = jest.mocked(useSearch)
    useSearchMock.mockReturnValueOnce({
      isLoading: false,
      handleSearch: handleSearchMock,
      searchValue: searchValueMock,
      setSearchValue: setSearchValueMock,
    })

    render(<Search isFetching={false} />)

    const button = screen.getByTestId(TEST_IDS.button)

    act(() => {
      fireEvent.press(button)
    })

    expect(handleSearchMock).toHaveBeenCalled()
  })

  it('should not handle search on press button which is disabled when isLoading is set to true', () => {
    const useSearchMock = jest.mocked(useSearch)
    useSearchMock.mockReturnValueOnce({
      isLoading: true,
      handleSearch: handleSearchMock,
      searchValue: searchValueMock,
      setSearchValue: setSearchValueMock,
    })

    render(<Search isFetching={true} />)

    const button = screen.getByTestId(TEST_IDS.button)

    fireEvent.press(button)

    expect(handleSearchMock).not.toHaveBeenCalledWith()
  })
})
