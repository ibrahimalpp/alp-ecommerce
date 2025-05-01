'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  icon?: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      addToCart: (item) => {
        const existing = get().cart.find((p) => p.id === item.id);
        if (existing) {
          set({
            cart: get().cart.map((p) =>
              p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...item, quantity: 1 }],
          });
        }
      },
      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((p) => p.id !== id),
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },
      increaseQuantity: (id) => {
        set({
          cart: get().cart.map((p) =>
            p.id === id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        });
      },
      decreaseQuantity: (id) => {
        set({
          cart: get().cart
            .map((p) =>
              p.id === id ? { ...p, quantity: p.quantity - 1 } : p
            )
            .filter((p) => p.quantity > 0),
        });
      },
    }),
    {
      name: 'cart-storage', // localStorage key
    }
  )
);
