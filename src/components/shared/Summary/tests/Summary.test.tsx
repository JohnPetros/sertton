import { render } from '@/_tests_/customs/customRender'
import { Summary } from '..'
import { screen } from '@testing-library/react-native'
import { formatPrice } from '@/utils/helpers/formatPrice'

describe('Summary component', () => {
  it('should render items count plural properly', () => {
    render(
      <Summary
        itemsCount={5}
        discount={100}
        subtotal={1000}
        total={100}
        shipmentCost={100}
      />
    )

    expect(screen.getByText('Produtos (5 items)'))

    render(
      <Summary
        itemsCount={1}
        discount={100}
        subtotal={1000}
        total={100}
        shipmentCost={100}
      />
    )

    expect(screen.getByText('Produtos (1 item)'))
  })

  it('should render discount', () => {
    const discount = 100

    render(
      <Summary
        itemsCount={5}
        discount={discount}
        subtotal={1000}
        total={100}
        shipmentCost={100}
      />
    )

    expect(screen.getByText('Desconto'))
    expect(screen.getByText(`- ${formatPrice(discount)}`))
  })

  it('should render shipmentCost', () => {
    const shipmentCost = 100

    render(
      <Summary
        itemsCount={5}
        discount={100}
        subtotal={1000}
        total={100}
        shipmentCost={shipmentCost}
      />
    )

    expect(screen.getByText('Frete'))
    expect(screen.getByText(`+ ${formatPrice(shipmentCost)}`))
  })

  it('should render total', () => {
    const total = 100

    render(
      <Summary
        itemsCount={5}
        discount={100}
        subtotal={1000}
        total={total}
        shipmentCost={100}
      />
    )

    expect(screen.getByText('Total'))
    expect(screen.getByText(formatPrice(total)))
  })
})
