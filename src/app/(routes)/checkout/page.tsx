'use client'

import { useRouter } from "next/navigation";
import { useCart } from "@/store/cartStore";
import { useBalanceStore } from "@/store/balanceStore"; // 💥 Bakiye store import
import { useState } from "react";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const { clearCart, cart } = useCart();
  const router = useRouter();
  const { decreaseBalance } = useBalanceStore(); // 💥 Balance işlemleri

  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const totalPrice = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0) * (item.quantity || 1), 0);

    decreaseBalance(totalPrice); // 💥 Ödeme tutarını bakiyeden düş
    clearCart(); // 💥 Sepeti temizle
    router.push('/success'); // 💥 Başarılı sayfasına yönlendir
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Ödeme Yap</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="İsim Soyisim"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-md"
          required
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Kart Numarası (16 haneli)"
          value={formData.cardNumber}
          onChange={handleChange}
          className="border p-3 rounded-md"
          required
          maxLength={16}
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="expiryDate"
            placeholder="Son Kullanım (AA/YY)"
            value={formData.expiryDate}
            onChange={handleChange}
            className="border p-3 rounded-md w-1/2"
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            className="border p-3 rounded-md w-1/2"
            required
            maxLength={3}
          />
        </div>
        <Button type="submit" className="mt-4">
          Ödemeyi Tamamla
        </Button>
      </form>
    </div>
  );
};

export default CheckoutPage;
