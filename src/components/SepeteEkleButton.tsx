'use client';

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/store/cartStore";
import confetti from 'canvas-confetti';

const SepeteEkleButton = ({ product }: { product: any }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleClick = () => {
    addToCart(product);
    toast({
      title: "Ürün Sepete Eklendi!",
      description: `${product.name} başarıyla sepete eklendi.`,
      duration: 2000,
    });
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <Button onClick={handleClick} variant="default" className="w-full">
      <ShoppingCart className="mr-2 h-4 w-4" />
      Sepete Ekle
    </Button>
  );
};

export default SepeteEkleButton;
