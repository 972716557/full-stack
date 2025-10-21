import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RefObject } from "react";
import { create } from "zustand";

interface DetailSheetStore {
  visible: boolean;
  ref: RefObject<BottomSheetMethods>;
  toggleVisible: () => void;
  setRef: (newRef: RefObject<BottomSheetMethods>) => void;
}

const useDishDetailSheet = create<DetailSheetStore>((set) => ({
  visible: false,
  ref: null,
  toggleVisible: () => set((state) => ({ visible: !state.visible })),
  setRef: (newRef: RefObject<BottomSheetMethods>) =>
    set(() => ({ ref: newRef })),
}));
export default useDishDetailSheet;
