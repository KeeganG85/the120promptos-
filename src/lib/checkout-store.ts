import { create } from "zustand";
import { ACCESS_KEY, product } from "@/lib/product";

export type Profile = {
  firstName: string;
  email: string;
  businessName: string;
  businessDoes: string;
};

type CheckoutState = {
  open: boolean;
  source: string;
  unlocked: boolean;
  profile: Profile | null;
  ready: boolean;
  openCheckout: (source?: string) => void;
  closeCheckout: () => void;
  complete: (profile: Profile) => void;
  hydrate: () => void;
};

export const useCheckout = create<CheckoutState>((set, get) => ({
  open: false,
  source: "hero",
  unlocked: false,
  profile: null,
  ready: false,
  openCheckout: (source = "hero") => {
    if (product.checkoutUrl) {
      window.location.assign(product.checkoutUrl);
      return;
    }
    if (get().unlocked) {
      window.location.assign("/library");
      return;
    }
    set({ open: true, source });
  },
  closeCheckout: () => set({ open: false }),
  complete: (profile) => {
    try {
      localStorage.setItem(
        ACCESS_KEY,
        JSON.stringify({ ...profile, at: Date.now() }),
      );
    } catch {
      /* private mode */
    }
    set({ unlocked: true, profile, open: false });
  },
  hydrate: () => {
    try {
      const raw = localStorage.getItem(ACCESS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<Profile> & { email?: string };
        if (parsed?.email) {
          set({
            unlocked: true,
            profile: {
              firstName: parsed.firstName ?? "",
              email: parsed.email,
              businessName: parsed.businessName ?? "",
              businessDoes: parsed.businessDoes ?? "",
            },
            ready: true,
          });
          return;
        }
      }
    } catch {
      /* ignore */
    }
    set({ ready: true });
  },
}));
