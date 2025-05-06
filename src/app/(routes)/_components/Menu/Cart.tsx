"use client";

import { useState } from "react";
import { useCart } from "@/store/cartStore";
import { ShoppingCart, Plus, Minus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useBalanceStore } from "@/store/balanceStore";
import { APIURL } from "@/app/constans";
import confetti from "canvas-confetti";
import "@/app/animations.css";
import { createOrder } from "../../../../../actions/createOrder";
import type { CartItem } from "@/app/constans";

const Cart = () => {
  const { cart, clearCart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const { balance, decreaseBalance } = useBalanceStore();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const totalPrice = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0) * (item.quantity || 1), 0);

  const handleClearCart = () => {
    if (confirm("Sepeti temizlemek istediğine emin misin?")) {
      clearCart();
      toast({
        title: "Sepet Temizlendi",
        description: "Sepet başarıyla boşaltıldı!",
        variant: "destructive",
      });
    }
  };

  const handlePayment = async () => {
    const userData = typeof window !== 'undefined' ? localStorage.getItem("user") : null;

    if (!userData) {
      toast({
        title: "\u00d6nce Giri\u015f Yap!",
        description: "\u00d6deme yapabilmek i\u00e7in giri\u015f yapmal\u0131s\u0131n.",
        variant: "destructive",
      });
      setOpen(false);
      return;
    }

    const parsedUser = JSON.parse(userData);

    if (!parsedUser) {
      toast({
        title: "\u00d6nce Giri\u015f Yap!",
        description: "\u00d6deme yapabilmek i\u00e7in giri\u015f yapmal\u0131s\u0131n.",
        variant: "destructive",
      });
      setOpen(false);
      return;
    }

    if (balance >= totalPrice) {
      const success = await createOrder(parsedUser.id, cart, totalPrice);

      if (!success) {
        toast({
          title: "Sipari\u015f Ba\u015far\u0131s\u0131z",
          description: "Sipari\u015f verilemedi, l\u00fctfen tekrar dene.",
          variant: "destructive",
        });
        return;
      }

      decreaseBalance(totalPrice);
      clearCart();
      setOpen(false);
      confetti();
      router.push("/success");
    } else {
      setOpen(false);
      router.push("/topup");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
            </span>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogTitle className="text-2xl text-center">🛒 Sepetim</DialogTitle>

        {cart.length === 0 ? (
          <p className="text-center mt-6 text-gray-500 text-lg">Sepet şu an boş... 😞</p>
        ) : (
          <div className="flex flex-col gap-4 mt-6 max-h-[400px] overflow-y-auto">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-3">
                  <Image
                    src={`${APIURL}/assets/${item.icon || "default-image.jpg"}`}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <span className="font-semibold">{item.name}</span>
                    <div className="text-xs text-gray-400">
                      {parseFloat(item.price).toFixed(2)} ₺ x {item.quantity || 1}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => decreaseQuantity(item.id)}>
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => increaseQuantity(item.id)}>
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => removeFromCart(item.id)}>
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <>
            <div className="flex justify-between font-bold text-lg mt-6">
              <span>Toplam:</span>
              <span>{totalPrice.toFixed(2)} ₺</span>
            </div>
            <div className="flex flex-col gap-4 mt-6">
              <Button variant="destructive" onClick={handleClearCart} className="w-full">
                Sepeti Temizle
              </Button>
              <Button variant="default" onClick={handlePayment} className="w-full">
                Ödeme Yap
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Cart;