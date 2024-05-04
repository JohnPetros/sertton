import { View } from 'react-native'
import { fireEvent, screen } from '@testing-library/react-native'

import { CONTACTS } from '../constants/contacts'
import { Contacts } from '..'

import { render } from '@/_tests_/customs/customRender'
import { useContactsMock } from './mocks/useContactsMock'

const Icon = () => <View />

jest.mock('phosphor-react-native', () => ({
  WhatsappLogo: () => {
    return <Icon />
  },
  Phone: () => {
    return <Icon />
  },
  EnvelopeSimple: () => {
    return <Icon />
  },
}))

jest.mock('../useContacts.ts')

describe('Contacts component', () => {
  it.each(CONTACTS)('should render $type contact button', ({ title }) => {
    useContactsMock()

    render(<Contacts />)

    const contactButton = screen.getByText(title)

    expect(contactButton).toBeTruthy()
  })

  it.each(CONTACTS)(
    'should handle contact url on press $type contact button',
    ({ url }) => {
      const { handleContactUrlMock } = useContactsMock()

      render(<Contacts />)

      const contactButton = screen.getByTestId(url)

      fireEvent.press(contactButton)

      expect(handleContactUrlMock).toHaveBeenCalledWith(url)
    },
  )
})
