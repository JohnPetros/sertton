import { Text } from 'react-native'
import { fireEvent, screen, waitFor } from '@testing-library/react-native'

import { Tabs } from '..'

import { render } from '@/_tests_/customs/customRender'
import { tabsMocks } from './mocks/tabsMock'

function renderComponent(width = 500) {
  return render(
    <Tabs
      label='Tabs label mock'
      tabs={[
        {
          ...tabsMocks[0],
          content: <Text>{tabsMocks[0].content}</Text>,
        },
        {
          ...tabsMocks[1],
          content: <Text>{tabsMocks[1].content}</Text>,
        },
      ]}
      width={width}
    />
  )
}

describe('Tabs component with useTabs hook', () => {
  it('should render tabs', () => {
    renderComponent()

    const tab1 = screen.getByText(tabsMocks[0].title)
    const tab2 = screen.getByText(tabsMocks[1].title)

    expect(tab1).toBeTruthy()
    expect(tab2).toBeTruthy()
  })

  it('should render first tab content', () => {
    const firstTab = tabsMocks[0]

    renderComponent()

    const firstTabContent = screen.getByText(String(firstTab.content))
    expect(firstTabContent).toBeTruthy()
  })

  it('should render tabs list with width', () => {
    const width = 100

    renderComponent(width)

    const tabsList = screen.getByTestId('tablist')

    expect(tabsList.props.style.width).toBe(width)
  })

  it('should render tabs list with width', () => {
    const width = 100

    renderComponent(width)

    const tabsList = screen.getByTestId('tablist')

    expect(tabsList.props.style.width).toBe(width)
  })

  it('should switch tab', async () => {
    renderComponent()

    const tab2 = screen.getByTestId('tab-2')

    fireEvent.press(tab2)

    await waitFor(() => {
      const tab2Content = screen.getByText(String(tabsMocks[1].content))
      expect(tab2Content).toBeTruthy()
    })
  })
})
