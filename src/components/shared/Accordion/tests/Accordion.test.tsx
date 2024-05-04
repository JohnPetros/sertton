import { render } from '@/_tests_/customs/customRender'
import { Accordion } from '..'
import { View } from 'react-native'
import { screen } from '@testing-library/react-native'
import { useAccordionMock } from './mocks/useAccordionMock'

jest.mock('../useAccordion.ts')

describe('Accordion component', () => {
  it('should have content', () => {
    useAccordionMock()

    const label = 'Accordion label'
    const contentId = 'accordion-content-id'

    render(
      <Accordion label={label}>
        <View testID={contentId} />
      </Accordion>,
    )

    const content = screen.getByTestId(contentId)

    expect(content).toBeTruthy()
  })

  it('should render label', () => {
    useAccordionMock()

    const label = 'Accordion label'
    const contentId = 'accordion-content-id'

    render(
      <Accordion label={label}>
        <View testID={contentId} />
      </Accordion>,
    )

    expect(screen.getByText(label)).toBeTruthy()
  })

  it('should render label', () => {
    useAccordionMock()

    const label = 'Accordion label'
    const contentId = 'accordion-content-id'

    render(
      <Accordion label={label}>
        <View testID={contentId} />
      </Accordion>,
    )

    expect(screen.getByText(label)).toBeTruthy()
  })

  it('should have container animated style', () => {
    const animatedStyle = { backgroundColor: 'red' }

    useAccordionMock({ containerAnimatedStyle: animatedStyle })

    const label = 'Accordion label'
    const contentId = 'accordion-content-id'

    render(
      <Accordion label={label}>
        <View testID={contentId} />
      </Accordion>,
    )

    const animatedContainer = screen.getByTestId('animated-container')

    expect(animatedContainer).toHaveAnimatedStyle(animatedStyle)
  })

  it('should have content animated style', () => {
    const animatedStyle: { height: number; overflow: 'hidden' } = {
      height: 100,
      overflow: 'hidden',
    }

    useAccordionMock({ contentAnimatedStyle: animatedStyle })

    const label = 'Accordion label'
    const contentId = 'accordion-content-id'

    render(
      <Accordion label={label}>
        <View testID={contentId} />
      </Accordion>,
    )

    const animatedContainer = screen.getByTestId('animated-content')

    expect(animatedContainer).toHaveAnimatedStyle(animatedStyle)
  })
})
