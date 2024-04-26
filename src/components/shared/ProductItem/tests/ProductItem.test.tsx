import { render } from '@/_tests_/customs/customRender'
import { ProductItem } from '..'
import { productsMock } from '@/_tests_/mocks/core/productsMock'
import { screen } from '@testing-library/react-native'

const productMock = productsMock[0]

describe('ProductItem component', () => {
  it('should have a link that goes to products details screen by slug', () => {
    render(
      <ProductItem
        data={productMock}
        isLoading={false}
        width={100}
        isColumn={false}
      />,
    )

    const link = screen.getByTestId('link')

    expect(link.props.href).toBe(`/${productMock.slug}`)
  })

  it('should render name, brand name, sku code and image url if they exists', () => {
    render(
      <ProductItem
        data={productMock}
        isLoading={false}
        width={100}
        isColumn={false}
      />,
    )

    expect(screen.getByText(productMock.name)).toBeTruthy()
    expect(screen.getByText(`SKU: ${productMock.skuCode}`)).toBeTruthy()
    expect(screen.getByTestId(productMock.imageUrl)).toBeTruthy()
  })

  it('should render discount percentage, cart button, discount price and sale price if it is not loading', () => {
    const { rerender } = render(
      <ProductItem
        data={productMock}
        isLoading={true}
        width={100}
        isColumn={false}
      />,
    )

    expect(screen.queryByTestId('discount-percentage')).not.toBeTruthy()
    expect(screen.queryByTestId('discount-price')).not.toBeTruthy()
    expect(screen.queryByTestId('sale-price')).not.toBeTruthy()
    expect(screen.queryByTestId('cart-button')).not.toBeTruthy()

    rerender(
      <ProductItem
        data={productMock}
        isLoading={false}
        width={100}
        isColumn={false}
      />,
    )

    expect(screen.getByTestId('discount-percentage')).toBeTruthy()
    expect(screen.getByTestId('discount-price')).toBeTruthy()
    expect(screen.getByTestId('sale-price')).toBeTruthy()
    expect(screen.getByTestId('cart-button')).toBeTruthy()
  })
})
