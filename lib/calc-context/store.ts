"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { CalcState, CalcStore } from "./types";

export const useCalcStore = create<CalcStore>()(
  persist(
    (set) => ({
      state: {},
      update: (partial) =>
        set((current) => ({ state: { ...current.state, ...partial } })),
      reset: () => set({ state: {} }),
    }),
    {
      name: "fitmetrify-calc",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (store) => ({ state: store.state }),
    }
  )
);

export function resetCalcStore(): void {
  useCalcStore.getState().reset();
}

export function getCalcState(): CalcState {
  return useCalcStore.getState().state;
}
