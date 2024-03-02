import './mocks/ProductItemMock'

import { screen } from '@testing-library/react-native'

import { ARIA_LABELS } from '../constants/aria-labels'

import { Collection } from '..'

import { render } from '@/_tests_/customs/customRender'
import { collectionsMock } from '@/_tests_/mocks/core/collectionsMock'

const collectionMock = collectionsMock[0]

describe('Collection component', () => {
  it('Should render skelleton when it is loading', () => {
    render(
      <Collection
        name={collectionMock.name}
        products={collectionMock.products}
        isLoading={true}
      />
    )

    const skeleton = screen.getByLabelText(ARIA_LABELS.collectionSkeletonVisible)

    expect(skeleton).toBeTruthy()
  })

  it('Should not render skelleton when it is not loading', () => {
    render(
      <Collection
        name={collectionMock.name}
        products={collectionMock.products}
        isLoading={false}
      />
    )

    const skeleton = screen.getByLabelText(ARIA_LABELS.collectionSkeletonInvisible)

    expect(skeleton).toBeTruthy()
  })

  it('Should render collection name', () => {
    render(
      <Collection
        name={collectionMock.name}
        products={collectionMock.products}
        isLoading={false}
      />
    )

    expect(screen.getByText(collectionMock.name)).toBeTruthy()
  })

  it.each(collectionMock.products.slice(0, 3))(
    'Should render collection $name product',
    ({ name }) => {
      render(
        <Collection
          name={collectionMock.name}
          products={collectionMock.products}
          isLoading={false}
        />
      )

      expect(screen.getByText(name)).toBeTruthy()
    }
  )
})
