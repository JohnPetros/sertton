export function formatPrice(price: number) {
  const priceFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  return priceFormatter.format(price)
}
