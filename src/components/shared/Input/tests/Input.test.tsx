import { screen } from '@testing-library/react-native'

import { Input } from '..'

import { TEST_IDS } from './constants/test-ids'

import { render } from '@/_tests_/customs/customRender'

describe('Input component', () => {
  it('should render label and sublabel', () => {
    const label = 'label'
    const sublabel = 'sublabel'

    render(<Input label={label} subLabel={sublabel} />)

    expect(screen.getByText(label)).toBeTruthy()
    expect(screen.getByText(sublabel)).toBeTruthy()
  })

  it('should render error message', () => {
    const errorMessage = 'error message'

    render(<Input error={errorMessage} />)

    expect(screen.getByText(errorMessage)).toBeTruthy()
  })

  it('should render spinner when is loading', () => {
    render(<Input isLoading={true} />)

    expect(screen.getByTestId(TEST_IDS.spinner)).toBeTruthy()
  })
})
