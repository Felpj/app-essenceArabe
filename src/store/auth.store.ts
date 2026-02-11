import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CustomerProfile, AuthSession } from "@/types/account";

interface AuthStore {
  session: AuthSession;
  profile: CustomerProfile | null;
  login: (profile: CustomerProfile) => void;
  logout: () => void;
  updateProfile: (updates: Partial<CustomerProfile>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      session: {
        isAuthenticated: false,
      },
      profile: null,

      login: (profile) => {
        set({
          session: {
            isAuthenticated: true,
            customerId: profile.id,
          },
          profile,
        });
      },

      logout: () => {
        set({
          session: {
            isAuthenticated: false,
            customerId: undefined,
            token: undefined,
          },
          profile: null,
        });
      },

      updateProfile: (updates) => {
        set((state) => {
          if (!state.profile) return state;
          return {
            profile: {
              ...state.profile,
              ...updates,
              updatedAt: new Date().toISOString(),
            },
          };
        });
      },
    }),
    {
      name: "EA_AUTH_SESSION_V1",
    }
  )
);
