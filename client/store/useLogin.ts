import { create } from "zustand";
interface Token {
  token: string;
  setToken: (token: string) => void;
}

export const useLoginStore = create<Token>((set) => ({
  token: "",
  setToken: (token) => set({ token }),
}));
