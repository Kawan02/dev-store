export function formatToCurrency(
  price: number,
  hasFees: boolean = false,
): string {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',

    minimumFractionDigits: hasFees ? undefined : 0,
    maximumFractionDigits: hasFees ? undefined : 0,
  })
}
