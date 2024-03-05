import { render } from "@/_tests_/customs/customRender"
import { CartItem } from ".."
import { skusMock } from "@/_tests_/mocks/core/skusMock"
import { useCartItemMock } from "./mocks/useCartItemMock"
import { variationsMock } from "@/_tests_/mocks/core/variationsMock"
import { screen } from "@testing-library/react-native"

jest.mock('../useCartItem.ts')

describe('CartItem component', () => {
  it('should not render list of variations if there are not variations', () => {
    useCartItemMock({ selectedSku: { ...skusMock[0], variations: [] } })

    render(
      <CartItem
        name=""
        imageUrl=""
        skus={skusMock}
        selectedSkuId=""
        width={100}
        isLoading={true}
        quantity={5} />
    )

    expect(screen.queryByTestId('variations-id')).not.toBeTruthy()
  })
})
