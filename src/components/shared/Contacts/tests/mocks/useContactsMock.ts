import { contactsProductsMock } from '@/_tests_/mocks/core/contactsProductsMock'
import { useContacts } from '../../useContacts'

export function useContactsMock(
  returnUseContactsMock?: Partial<ReturnType<typeof useContacts>>,
) {
  const handleContactUrlMock = jest.fn()

  jest.mocked(useContacts).mockReturnValueOnce({
    handleContactUrl: handleContactUrlMock,
  })

  return {
    handleContactUrlMock,
  }
}
