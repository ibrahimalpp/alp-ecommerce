import { create } from 'zustand';

interface BalanceState {
  balance: number;
  decreaseBalance: (amount: number) => void;
  resetBalance: () => void;
  setBalance: (amount: number) => void;
}

export const useBalanceStore = create<BalanceState>((set) => ({
  balance: typeof window !== 'undefined'
    ? (parseFloat(localStorage.getItem('balance') || '1250') || 1250)
    : 1250,

  decreaseBalance: (amount) => set((state) => {
    const newBalance = state.balance - amount;
    if (typeof window !== 'undefined') {
      localStorage.setItem('balance', newBalance.toString());
    }
    return { balance: newBalance };
  }),

  resetBalance: () => set(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('balance', '1250');
    }
    return { balance: 1250 };
  }),

  setBalance: (amount) => set(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('balance', amount.toString());
    }
    return { balance: amount };
  }),
}));
