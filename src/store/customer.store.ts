import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Address, CustomerOrder, CustomerPreferences } from "@/types/account";

interface CustomerStore {
  addresses: Address[];
  orders: CustomerOrder[];
  preferences: CustomerPreferences;
  addAddress: (address: Omit<Address, "id">) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: CustomerOrder) => void;
  updateOrder: (orderCode: string, updates: Partial<CustomerOrder>) => void;
  updatePreferences: (updates: Partial<CustomerPreferences>) => void;
}

const defaultPreferences: CustomerPreferences = {
  receiveWhatsAppUpdates: true,
  receiveEmailUpdates: false,
  favoriteCategories: [],
};

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set) => ({
      addresses: [],
      orders: [],
      preferences: defaultPreferences,

      addAddress: (address) => {
        const newAddress: Address = {
          ...address,
          id: `addr-${Date.now()}`,
        };
        set((state) => ({
          addresses: [...state.addresses, newAddress],
        }));
      },

      updateAddress: (id, updates) => {
        set((state) => ({
          addresses: state.addresses.map((addr) =>
            addr.id === id ? { ...addr, ...updates } : addr
          ),
        }));
      },

      removeAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((addr) => addr.id !== id),
        }));
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          })),
        }));
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },

      updateOrder: (orderCode, updates) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.orderCode === orderCode ? { ...order, ...updates } : order
          ),
        }));
      },

      updatePreferences: (updates) => {
        set((state) => ({
          preferences: { ...state.preferences, ...updates },
        }));
      },
    }),
    {
      name: "EA_CUSTOMER_DATA_V1",
    }
  )
);
