/**
 * Formata valor em reais (BRL)
 */
export function formatMoney(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Formata valor sem símbolo de moeda
 */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Calcula parcelas
 */
export function calculateInstallment(total: number, installments: number = 12): number {
  return Math.ceil(total / installments);
}
