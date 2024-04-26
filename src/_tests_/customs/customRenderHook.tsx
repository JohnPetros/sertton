import '../mocks/components/IconsMock'

import { renderHook } from '@testing-library/react-native'

import { Providers } from '@/providers/index'

// Cache bug fix
jest.useFakeTimers()

function customRenderHook<Result, Props>(hook: (props: unknown) => Result) {
  return renderHook<Result, Props>(hook, {
    wrapper: ({ children }) => <Providers>{children}</Providers>,
  })
}

export { customRenderHook as renderHook }
