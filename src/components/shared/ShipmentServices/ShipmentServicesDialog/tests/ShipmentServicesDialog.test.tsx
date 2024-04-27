import { render } from '@/_tests_/customs/customRender'
import { ShipmentServicesDialog } from '..'
import { useShipmentServicesDialogMock } from './mocks/useShipmentServicesDialogMock'
import { act, fireEvent, screen } from '@testing-library/react-native'
import { Button } from 'react-native'
import { addressesMock } from '@/_tests_/mocks/core/addressesMock'
import { shipmentServicesMock } from '@/_tests_/mocks/core/shipmentsServicesMock'
import { formatPrice } from '@/utils/helpers/formatPrice'

jest.mock('../useShipmentServicesDialog.ts')

const addressMock = addressesMock[0]
const onOpenChangeMock = jest.fn()

describe('ShipmentServicesDialog component', () => {
  it('should render a loading if it is loading', () => {
    useShipmentServicesDialogMock({ isLoading: true })

    render(
      <ShipmentServicesDialog
        onOpenChange={onOpenChangeMock}
        shipmentServices={[]}
        zipcode=''
      >
        <Button testID='trigger' title='' />
      </ShipmentServicesDialog>,
    )

    act(() => {
      fireEvent.press(screen.getByTestId('trigger'))
    })

    expect(screen.getByText('Calculando frete...')).toBeTruthy()
  })

  it("should render a address' zipcode, city and uf if there is an address and it is not loading", () => {
    useShipmentServicesDialogMock({ isLoading: false, address: addressMock })

    render(
      <ShipmentServicesDialog
        onOpenChange={onOpenChangeMock}
        shipmentServices={[]}
        zipcode=''
      >
        <Button testID='trigger' title='' />
      </ShipmentServicesDialog>,
    )

    act(() => {
      fireEvent.press(screen.getByTestId('trigger'))
    })

    expect(screen.getByText(addressMock.zipcode)).toBeTruthy()
    expect(
      screen.getByText(`${addressMock.city} - ${addressMock.uf}`),
    ).toBeTruthy()
  })

  it("should render a address' shipment services if it is not loading and there is an address and shipment services", () => {
    useShipmentServicesDialogMock({ isLoading: false, address: addressMock })

    const { rerender } = render(
      <ShipmentServicesDialog
        onOpenChange={onOpenChangeMock}
        shipmentServices={[]}
        zipcode=''
      >
        <Button testID='trigger' title='' />
      </ShipmentServicesDialog>,
    )

    act(() => {
      fireEvent.press(screen.getByTestId('trigger'))
    })

    for (const shipmentService of shipmentServicesMock) {
      expect(screen.queryByText(shipmentService.name)).not.toBeTruthy()
      expect(
        screen.queryByText(`até ${shipmentService.days} dias úteis`),
      ).not.toBeTruthy()
      expect(
        screen.queryByText(formatPrice(shipmentService.price)),
      ).not.toBeTruthy()
    }

    useShipmentServicesDialogMock({ isLoading: false, address: addressMock })

    rerender(
      <ShipmentServicesDialog
        onOpenChange={onOpenChangeMock}
        shipmentServices={shipmentServicesMock}
        zipcode=''
      >
        <Button testID='trigger' title='' />
      </ShipmentServicesDialog>,
    )

    for (const shipmentService of shipmentServicesMock) {
      expect(screen.getByText(shipmentService.name)).toBeTruthy()
      expect(
        screen.getByText(`até ${shipmentService.days} dias úteis`),
      ).toBeTruthy()
      expect(screen.getByText(formatPrice(shipmentService.price))).toBeTruthy()
    }
  })

  it('should render empty message text if it is not loading', () => {
    useShipmentServicesDialogMock({ isLoading: false, address: null })

    render(
      <ShipmentServicesDialog
        onOpenChange={onOpenChangeMock}
        shipmentServices={[]}
        zipcode=''
      >
        <Button testID='trigger' title='' />
      </ShipmentServicesDialog>,
    )

    act(() => {
      fireEvent.press(screen.getByTestId('trigger'))
    })

    expect(
      screen.getByText('Nenhum endereço encontrado para esse CEP'),
    ).toBeTruthy()
    expect(
      screen.getByText('Pressione em "X" para tentar novamente'),
    ).toBeTruthy()
  })
})
