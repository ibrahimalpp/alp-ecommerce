'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BalanceState {
  balance: number;
  decreaseBalance: (amount: number) => void;
  resetBalance: () => void;
  setBalance: (amount: number) => void;
}

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set) => ({
      balance: 1250,

      decreaseBalance: (amount) =>
        set((state) => ({
          balance: state.balance - amount,
        })),

      resetBalance: () =>
        set(() => ({
          balance: 1250,
        })),

      setBalance: (amount) =>
        set(() => ({
          balance: amount,
        })),
    }),
    {
      name: 'balance-storage', // localStorage key adı
    }
  )
);
