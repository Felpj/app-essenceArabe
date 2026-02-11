/**
 * Cupons mockados para UI (sem backend)
 */

export type DiscountType = "PERCENT" | "AMOUNT";

export interface MockCoupon {
  code: string;
  discountType: DiscountType;
  value: number; // percentual (0-100) ou valor em BRL
  description?: string;
  minPurchase?: number; // valor mínimo de compra
}

export const mockCoupons: MockCoupon[] = [
  {
    code: "BEMVINDO10",
    discountType: "PERCENT",
    value: 10,
    description: "10% de desconto na primeira compra",
  },
  {
    code: "FRETEGRATIS",
    discountType: "AMOUNT",
    value: 15, // equivalente ao frete
    description: "Frete grátis",
    minPurchase: 200,
  },
  {
    code: "PIX5",
    discountType: "AMOUNT",
    value: 5,
    description: "R$ 5 de desconto",
  },
  {
    code: "PRIMEIRA20",
    discountType: "PERCENT",
    value: 20,
    description: "20% de desconto",
    minPurchase: 300,
  },
];

/**
 * Valida cupom (mock)
 */
export function validateCoupon(
  code: string,
  subtotal: number
): { valid: boolean; coupon?: MockCoupon; error?: string } {
  const normalizedCode = code.toUpperCase().trim();
  const coupon = mockCoupons.find((c) => c.code === normalizedCode);

  if (!coupon) {
    return {
      valid: false,
      error: "Cupom inválido",
    };
  }

  if (coupon.minPurchase && subtotal < coupon.minPurchase) {
    return {
      valid: false,
      error: `Compra mínima de ${coupon.minPurchase.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })}`,
    };
  }

  return {
    valid: true,
    coupon,
  };
}

/**
 * Calcula desconto do cupom
 */
export function calculateDiscount(
  coupon: MockCoupon,
  subtotal: number
): number {
  if (coupon.discountType === "PERCENT") {
    return (subtotal * coupon.value) / 100;
  }
  return coupon.value;
}
