/**
 * Tipos para upsell e cross-sell (Front-only)
 */

export type UpsellType =
  | "ORDER_BUMP"
  | "BUNDLE"
  | "UPGRADE"
  | "POST_PURCHASE";

export type DiscountType = "PERCENT" | "FIXED";

export interface UpsellEligibility {
  minCartTotal?: number;
  requiresProductId?: string;
  excludeIfInCart?: string[];
  maxUses?: number;
}

export interface UpsellUI {
  badge?: string;
  image?: string;
  ctaText: string;
  description?: string;
}

export interface UpsellOffer {
  id: string;
  type: UpsellType;
  title: string;
  subtitle?: string;
  productIds: string[];
  discountType?: DiscountType;
  discountValue?: number;
  fixedBundlePrice?: number;
  eligibility: UpsellEligibility;
  priority: number;
  ui: UpsellUI;
  expiresAt?: string; // Para OTO
}

export type UpsellAction = "IMPRESSION" | "CLICK" | "ACCEPT" | "DECLINE";
export type UpsellContext = "PDP" | "CART" | "CHECKOUT" | "THANK_YOU";

export interface UpsellEvent {
  ts: string;
  sessionId: string;
  offerId: string;
  action: UpsellAction;
  context: UpsellContext;
  orderCode?: string;
  cartValue?: number;
}

export interface UpsellConfig {
  freeShippingThreshold: number;
  minMargin: number;
  maxOffersPerContext: {
    PDP: number;
    CART: number;
    CHECKOUT: number;
    THANK_YOU: number;
  };
}
