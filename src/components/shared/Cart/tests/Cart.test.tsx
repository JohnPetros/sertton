import './mocks/HeaderMock'
import './mocks/CartItemMock'
import './mocks/CartSummaryMock'

import { screen } from '@testing-library/react-native'

import { render } from '@/_tests_/customs/customRender'

import { Cart } from '..'
import { TEST_IDS } from './test-ids'
import { useCartMock } from './mocks/useCartMock'

jest.mock('../useCart.ts')

describe('CartDialog component', () => {
  it('should render empty list message if the cart is empty', () => {
    useCartMock({ totalCartItems: 0 })

    render(<Cart />)

    expect(screen.getByText(/Seu carrinho está vazio/i)).toBeTruthy()
  })

  it('should not render clear cart alert dialog if the cart is empty', () => {
    useCartMock({ totalCartItems: 0 })

    render(<Cart />)

    expect(screen.queryByTestId(TEST_IDS.alertDialog)).not.toBeTruthy()
  })

  it('should not render cart summary if the cart is empty', () => {
    useCartMock({ totalCartItems: 0 })

    render(<Cart />)

    expect(screen.queryByTestId(TEST_IDS.cartSummary)).not.toBeTruthy()
  })

  it('should not render finish order button if the cart is empty', () => {
    useCartMock({ totalCartItems: 0 })

    render(<Cart />)

    expect(screen.queryByText(/Finalizar compra/)).not.toBeTruthy()
  })

  it('should not render cart items if the cart is loading and not empty', () => {
    useCartMock({ isLoading: true, totalCartItems: 1 })

    render(<Cart />)

    expect(screen.queryByTestId(TEST_IDS.itemsList)).not.toBeTruthy()
  })

  it('should render cart items placeholder if the cart is loading and not empty', () => {
    useCartMock({ isLoading: true, totalCartItems: 1 })

    render(<Cart />)

    expect(screen.getByTestId(TEST_IDS.itemsListPlaceholder)).toBeTruthy()
  })
})
