import { IHttp } from "../../http/interfaces/IHttp"
import { ILeadsController } from "../../interfaces/ILeadsController"
import { ENDPOINTS } from "../constants/endpoints"

export function YampiLeadsController(http: IHttp): ILeadsController {
  return {
    async saveLead(email: string) {
      await http.post(`/${ENDPOINTS.lead}`, { email })
    },

    async getLeads() {
      throw new Error('getLeads Not Implemented')
    },
  }
}
