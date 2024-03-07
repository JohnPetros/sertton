import { brandsMock } from "@/_tests_/mocks/core/brandsMock"
import { tagsMock } from "@/_tests_/mocks/core/tagsMock"

import { useTags } from "../../Tag/useTags"

export function useTagsMock(returnMock?: Partial<ReturnType<typeof useTags>>) {
  jest.mocked(useTags).mockReturnValueOnce({
    brands: brandsMock,
    tags: tagsMock,
    handleTag: jest.fn(),
    ...returnMock,
  })

  return {

  }
}
