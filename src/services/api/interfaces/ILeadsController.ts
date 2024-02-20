import type { Lead } from "@/@types/Lead"

export interface ILeadsController {
  saveLead(email: string): Promise<void>
  getLeads(): Promise<Lead[]>
}
