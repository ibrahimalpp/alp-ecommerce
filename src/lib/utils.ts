import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// utils/slugify.ts

export const slugify = (text: string) => {
  return text
    .toString()
    .normalize('NFD') // Unicode karakterleri parçala
    .replace(/[\u0300-\u036f]/g, '') // Aksanları kaldır
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // boşlukları - yap
    .replace(/[^\w-]+/g, '') // alfasayısal olmayan karakterleri temizle
    .replace(/--+/g, '-') // çoklu tireleri tek tireye indir
    .replace(/^-+/, '') // baştaki tireyi kaldır
    .replace(/-+$/, ''); // sondaki tireyi kaldır
};
