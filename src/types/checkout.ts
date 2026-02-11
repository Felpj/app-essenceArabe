/**
 * Tipos para checkout (Front-only)
 */

export interface CheckoutContact {
  fullName: string;
  whatsapp: string;
  email?: string;
  wantsWhatsAppUpdates?: boolean;
}

export interface CheckoutDelivery {
  cep: string;
  addressLine1: string; // rua, número
  addressLine2?: string; // complemento
  neighborhood: string;
  city: string;
  state: string;
  reference?: string;
  shippingMethodId: string; // EXPRESS_24H, STANDARD
}

export interface CheckoutPayment {
  method: "PIX" | "CARD" | "BOLETO" | "WHATSAPP_PAY";
  card?: {
    holderName: string;
    number: string;
    expiry: string;
    cvv: string;
  };
}

export interface CheckoutOrderBump {
  enabled: boolean;
  offerId?: string;
}

export interface CheckoutDraft {
  contact?: CheckoutContact;
  delivery?: CheckoutDelivery;
  payment?: CheckoutPayment;
  orderBump?: CheckoutOrderBump;
  notes?: string;
  acceptTerms?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderPreview {
  items: Array<{
    product: {
      id: string;
      name: string;
      brand: string;
      image: string;
      price_brl: number;
    };
    quantity: number;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  orderBumpValue: number;
  total: number;
}
