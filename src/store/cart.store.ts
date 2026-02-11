import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";
import { MockCoupon, calculateDiscount } from "@/data/mockCoupons";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartCoupon {
  code: string;
  discountType: "PERCENT" | "AMOUNT";
  value: number;
}

interface CartStore {
  items: CartItem[];
  coupon: CartCoupon | null;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  increment: (productId: string) => void;
  decrement: (productId: string) => void;
  clearCart: () => void;
  applyCoupon: (coupon: CartCoupon) => void;
  removeCoupon: () => void;
  getTotalItems: () => number;
  getSubtotal: () => number;
  getDiscountTotal: () => number;
  getTotalPrice: () => number;
  getItem: (productId: string) => CartItem | undefined;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      coupon: null,

      addItem: (product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, quantity }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      increment: (productId) => {
        const item = get().items.find((item) => item.product.id === productId);
        if (item) {
          get().updateQuantity(productId, item.quantity + 1);
        }
      },

      decrement: (productId) => {
        const item = get().items.find((item) => item.product.id === productId);
        if (item && item.quantity > 1) {
          get().updateQuantity(productId, item.quantity - 1);
        }
      },

      clearCart: () => {
        set({ items: [], coupon: null });
      },

      applyCoupon: (coupon) => {
        set({ coupon });
      },

      removeCoupon: () => {
        set({ coupon: null });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price_brl * item.quantity,
          0
        );
      },

      getDiscountTotal: () => {
        const coupon = get().coupon;
        if (!coupon) return 0;

        const subtotal = get().getSubtotal();
        return calculateDiscount(
          {
            code: coupon.code,
            discountType: coupon.discountType,
            value: coupon.value,
          },
          subtotal
        );
      },

      getTotalPrice: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountTotal();
        return Math.max(0, subtotal - discount);
      },

      getItem: (productId) => {
        return get().items.find((item) => item.product.id === productId);
      },
    }),
    {
      name: "EA_CART_V1",
    }
  )
);
