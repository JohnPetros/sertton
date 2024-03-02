import { screen } from '@testing-library/react-native'

import { render } from '@/_tests_/customs/customRender'

import { Splash } from '..'

describe('Splash component', () => {
  it('should render app name', () => {
    render(<Splash />)

    expect(screen.getByText('Sertton')).toBeTruthy()
  })
})
