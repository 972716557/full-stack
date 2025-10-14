import { create } from "zustand";

const useCartCount = create((set) => ({
  cartCount: 0,
  increaseCartCount: () => set((state) => ({ bears: state.cartCount + 1 })),
}));
export default useCartCount;
