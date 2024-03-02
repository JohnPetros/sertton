import '@/_tests_/mocks/providers/ProvidersFixBug'

import { fireEvent, screen } from '@testing-library/react-native'

import { CONTACTS } from '../constants/contacts'
import { useContacts } from '../useContacts'
import { Contacts } from '..'

import { render } from '@/_tests_/customs/customRender'

jest.mock('../useContacts.ts')

describe('Contacts component', () => {
  it.each(CONTACTS)('should render $type contact button', ({ title }) => {
    jest.mocked(useContacts).mockReturnValueOnce({ handleContactUrl: jest.fn() })

    render(<Contacts />)

    const contactButton = screen.getByText(title)

    expect(contactButton).toBeTruthy()
  })

  it.each(CONTACTS)(
    'should handle contact url on press $type contact button',
    ({ url }) => {
      const handleContactUrlMock = jest.fn()

      jest
        .mocked(useContacts)
        .mockReturnValueOnce({ handleContactUrl: handleContactUrlMock })

      render(<Contacts />)

      const contactButton = screen.getByTestId(url)

      fireEvent.press(contactButton)

      expect(handleContactUrlMock).toHaveBeenCalledWith(url)
    }
  )
})
