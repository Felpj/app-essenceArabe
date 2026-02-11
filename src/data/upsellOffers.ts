import { UpsellOffer } from "@/types/upsell";
import { products } from "./products";

/**
 * Ofertas de upsell mockadas
 */
export const mockUpsellOffers: UpsellOffer[] = [
  // Order Bump - Decant
  {
    id: "BUMP_DECANT_10ML",
    type: "ORDER_BUMP",
    title: "Decant 10ml Exclusivo",
    subtitle: "Experimente antes de comprar o frasco completo",
    productIds: ["decant-10ml-khamrah"],
    discountType: "PERCENT",
    discountValue: 15,
    eligibility: {
      minCartTotal: 100,
      excludeIfInCart: ["decant-10ml-khamrah"],
    },
    priority: 10,
    ui: {
      badge: "Oferta Especial",
      image: "https://images.unsplash.com/photo-1612817288484-6f916840f6f6?w=200&h=200&fit=crop",
      ctaText: "Adicionar com 15% OFF",
      description: "Entrega junto no mesmo pacote",
    },
  },
  // Bundle - Kit Doces
  {
    id: "BUNDLE_KIT_DOCES",
    type: "BUNDLE",
    title: "Kit Doces Árabe",
    subtitle: "Khamrah + Eclair - Economize R$ 29",
    productIds: ["khamrah-100ml", "eclair-100ml"],
    fixedBundlePrice: 299.0,
    eligibility: {
      minCartTotal: 0,
      excludeIfInCart: ["khamrah-100ml", "eclair-100ml"],
    },
    priority: 8,
    ui: {
      badge: "Economize R$ 29",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop",
      ctaText: "Quero esse combo",
      description: "2 perfumes por um preço especial",
    },
  },
  // Bundle - Kit Amadeirado
  {
    id: "BUNDLE_KIT_AMADEIRADO",
    type: "BUNDLE",
    title: "Kit Amadeirado Premium",
    subtitle: "Oud + Tobacco - Economize R$ 35",
    productIds: ["oud-100ml", "tobacco-100ml"],
    fixedBundlePrice: 349.0,
    eligibility: {
      minCartTotal: 0,
      excludeIfInCart: ["oud-100ml", "tobacco-100ml"],
    },
    priority: 7,
    ui: {
      badge: "Economize R$ 35",
      image: "https://images.unsplash.com/photo-1595425970377-c9700292b1c4?w=200&h=200&fit=crop",
      ctaText: "Adicionar kit",
      description: "Perfeito para quem ama fragrâncias intensas",
    },
  },
  // Post Purchase - OTO
  {
    id: "OTO_SECOND_PERFUME",
    type: "POST_PURCHASE",
    title: "Segundo Perfume com 10% OFF",
    subtitle: "Oferta relâmpago - Válida por 10 minutos",
    productIds: ["khamrah-100ml"],
    discountType: "PERCENT",
    discountValue: 10,
    eligibility: {
      minCartTotal: 0,
      maxUses: 1,
    },
    priority: 9,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10 min
    ui: {
      badge: "Oferta Relâmpago",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&h=200&fit=crop",
      ctaText: "Adicionar com desconto",
      description: "Oferta única desta compra",
    },
  },
];

/**
 * Configuração de upsell
 */
export const upsellConfig = {
  freeShippingThreshold: 200,
  minMargin: 0.3, // 30% margem mínima
  maxOffersPerContext: {
    PDP: 4,
    CART: 3,
    CHECKOUT: 1,
    THANK_YOU: 1,
  },
};

/**
 * Helper para verificar elegibilidade de oferta
 */
export function isOfferEligible(
  offer: UpsellOffer,
  cartTotal: number,
  cartProductIds: string[],
  currentProductId?: string
): boolean {
  const { eligibility } = offer;

  // Verifica valor mínimo do carrinho
  if (eligibility.minCartTotal && cartTotal < eligibility.minCartTotal) {
    return false;
  }

  // Verifica se requer produto específico
  if (eligibility.requiresProductId) {
    if (currentProductId !== eligibility.requiresProductId) {
      return false;
    }
  }

  // Verifica se deve excluir se já está no carrinho
  if (eligibility.excludeIfInCart) {
    const hasExcludedProduct = eligibility.excludeIfInCart.some((id) =>
      cartProductIds.includes(id)
    );
    if (hasExcludedProduct) {
      return false;
    }
  }

  // Verifica se os produtos do bundle já estão no carrinho
  const allBundleProductsInCart = offer.productIds.every((id) =>
    cartProductIds.includes(id)
  );
  if (allBundleProductsInCart) {
    return false;
  }

  return true;
}

/**
 * Filtra e ordena ofertas elegíveis
 */
export function getEligibleOffers(
  context: "PDP" | "CART" | "CHECKOUT" | "THANK_YOU",
  cartTotal: number,
  cartProductIds: string[],
  currentProductId?: string
): UpsellOffer[] {
  const eligible = mockUpsellOffers
    .filter((offer) => {
      // Filtra por contexto (exceto POST_PURCHASE que só aparece em THANK_YOU)
      if (offer.type === "POST_PURCHASE" && context !== "THANK_YOU") {
        return false;
      }
      if (offer.type === "POST_PURCHASE" && context === "THANK_YOU") {
        return true;
      }
      if (context === "THANK_YOU") {
        return false; // Só POST_PURCHASE em THANK_YOU
      }

      return isOfferEligible(offer, cartTotal, cartProductIds, currentProductId);
    })
    .sort((a, b) => b.priority - a.priority)
    .slice(0, upsellConfig.maxOffersPerContext[context]);

  return eligible;
}
