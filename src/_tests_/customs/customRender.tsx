import '../mocks/components/IconsMock'

import { ReactNode } from 'react'
import { render as renderComponent } from '@testing-library/react-native'

import { Providers } from '@/providers/index'

// Cache bug fix
jest.useFakeTimers()

function customRender(component: ReactNode) {
  return renderComponent(<Providers>{component}</Providers>)
}

export { customRender as render }
