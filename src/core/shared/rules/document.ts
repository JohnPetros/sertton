export enum DocumentType {
  cnpj = "cnpj",
  cpf = "cpf",
}

export const sanitizeDocument = (document: string): string => document.replace(/\D/g, "")

export const getDocumentType = (document: string): DocumentType | undefined => {
  const sanitized = sanitizeDocument(document)

  if (sanitized.length === 11) return DocumentType.cpf
  if (sanitized.length === 14) return DocumentType.cnpj

  return undefined
}

export const formatDocument = (document: string): string => {
  const sanitized = sanitizeDocument(document)

  if (sanitized.length === 11) {
    return sanitized.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4")
  }

  if (sanitized.length === 14) {
    return sanitized.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")
  }

  return document
}
