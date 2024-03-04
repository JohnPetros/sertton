
import { IHttp } from '../../http/interfaces/IHttp'
import { ICheckoutController } from '../../interfaces/ICheckoutController'
import { YampiPaymentAdapter } from '../adapters/YampiPaymentAdapter'
import { RESOURCES } from '../constants/resources'
import { YampiPayment } from '../types/YampiPayment'

const YAMPI_PURCHASE_URL = process.env.EXPO_PUBLIC_YAMPI_PURCHASE_URL

export const YampiCheckoutController = (
  http: IHttp
): ICheckoutController => {
  return {
    async getPayments() {
      const response = await http.get<{ data: YampiPayment[] }>(
        `/${RESOURCES.checkout}/payments`
      )

      return response.data.map(YampiPaymentAdapter)
    },

    getCheckoutUrl() {
      if (!YAMPI_PURCHASE_URL) throw new Error('Yampi purchase url is not provided')

      return YAMPI_PURCHASE_URL
    },
  }
}
