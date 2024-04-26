import '../mocks/components/IconsMock'

import { ReactNode } from 'react'
import { render as renderComponent } from '@testing-library/react-native'

import { Providers } from '@/providers/index'

// Cache bug fix
jest.useFakeTimers()

function customRender(component: ReactNode) {
  const jestUtils = renderComponent(<Providers>{component}</Providers>)

  return {
    ...jestUtils,
    rerender: (component: ReactNode) => {
      jestUtils.rerender(<Providers>{component}</Providers>)
    },
  }
}

export { customRender as render }
