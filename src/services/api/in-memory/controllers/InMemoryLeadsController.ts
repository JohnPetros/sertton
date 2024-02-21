import { ILeadsController } from '../../interfaces/ILeadsController'

import type { Lead } from '@/@types/Lead'


export function InMemoryLeadsController(): ILeadsController {
  const leads: Lead[] = []

  return {
    async getLeads() {
      return leads
    },

    async saveLead(email) {
      leads.push({ email })
    },
  }
}
