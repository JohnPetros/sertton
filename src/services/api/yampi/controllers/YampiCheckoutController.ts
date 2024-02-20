
import { IHttp } from '../../http/interfaces/IHttp'
import { ICheckoutController } from '../../interfaces/ICheckoutController'
import { YampiPaymentAdapter } from '../adapters/YampiPaymentAdapter'
import { RESOURCES } from '../constants/resources'
import { YampiPayment } from '../types/YampiPayment'

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
  }
}
