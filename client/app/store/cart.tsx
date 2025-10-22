import { create } from "zustand";
interface CartCountState {
  cartCount: number;
  increaseCartCount: () => void;
}

const useCartCount = create<CartCountState>((set) => ({
  cartCount: 0,
  increaseCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
}));
export default useCartCount;
