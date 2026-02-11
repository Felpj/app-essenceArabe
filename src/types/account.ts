/**
 * Tipos para conta do cliente (Front-only)
 */

export interface CustomerProfile {
  id: string;
  fullName: string;
  email?: string;
  whatsapp: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthSession {
  isAuthenticated: boolean;
  customerId?: string;
  token?: string; // Futuro: JWT
}

export type AddressLabel = "Casa" | "Trabalho" | "Outro";

export interface Address {
  id: string;
  label: AddressLabel;
  cep: string;
  addressLine1: string;
  addressLine2?: string;
  neighborhood: string;
  city: string;
  state: string;
  reference?: string;
  isDefault: boolean;
}

export type OrderStatus =
  | "CONFIRMADO"
  | "EM_SEPARACAO"
  | "ENVIADO"
  | "ENTREGUE"
  | "CANCELADO";

export interface OrderTracking {
  carrier?: string;
  code?: string;
  url?: string;
}

export interface CustomerOrder {
  orderCode: string; // EA-YYYYMMDD-XXXX
  status: OrderStatus;
  total: number;
  items: Array<{
    name: string;
    qty: number;
    price: number;
    image?: string;
  }>;
  createdAt: string;
  tracking?: OrderTracking;
  contact?: {
    fullName: string;
    whatsapp: string;
    email?: string;
  };
  delivery?: {
    addressLine1: string;
    addressLine2?: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
  payment?: {
    method: string;
  };
}

export interface CustomerPreferences {
  receiveWhatsAppUpdates: boolean;
  receiveEmailUpdates: boolean;
  favoriteCategories: string[];
}
