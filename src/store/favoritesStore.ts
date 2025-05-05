import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/app/constans';

interface FavoritesState {
  favorites: Product[];
  addFavorite: (product: Product) => void;
  removeFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      addFavorite: (product) => {
        const current = get().favorites;
        if (!current.find((item) => item.id === product.id)) {
          set({ favorites: [...current, product] });
        }
      },
      removeFavorite: (productId) => {
        set({ favorites: get().favorites.filter((item) => item.id !== productId) });
      },
      isFavorite: (productId) => {
        return get().favorites.some((item) => item.id === productId);
      }
    }),
    {
      name: 'favorites-storage',
    }
  )
);
