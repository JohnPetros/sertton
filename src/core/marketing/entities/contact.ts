export enum ContactOrigin {
  email = "email",
  landline = "landline",
  whatsapp = "whatsapp",
}

export interface Contact {
  readonly origin: ContactOrigin
  readonly title: string
  readonly url: string
}
