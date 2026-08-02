export const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
  }).format(value)

export const formatDate = (value: Date): string => new Intl.DateTimeFormat("pt-BR").format(value)
