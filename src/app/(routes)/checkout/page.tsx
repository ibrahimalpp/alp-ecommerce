"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/store/cartStore";
import { useBalanceStore } from "@/store/balanceStore";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CardPreview from "./CardPreview";
import { createOrder } from "../../../../actions/createOrder";

const CheckoutPage = () => {
  const { clearCart, cart } = useCart();
  const router = useRouter();
  const { decreaseBalance } = useBalanceStore();

  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [focused, setFocused] = useState<"cardNumber" | "name" | "expiry" | "cvv" | null>(null);

  useEffect(() => {
    // GİRİŞ YAPILMIŞ GİBİ YAPMAK İÇİN (TEST AMAÇLI)
    localStorage.setItem("user", JSON.stringify({ id: 1 }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const raw = value.replace(/\D/g, "").slice(0, 16);
      const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
      setFormData({
        ...formData,
        cardNumber: formatted,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 handleSubmit çalıştı");

    const userData = localStorage.getItem("user");
    const parsedUser = userData ? JSON.parse(userData) : null;
    console.log("👤 Kullanıcı:", parsedUser);

    if (!parsedUser) {
      alert("Sipariş için giriş yapmalısınız.");
      return;
    }

    const isValidCard =
      formData.cardNumber.replace(/\s/g, "") === "4242424242424242" &&
      formData.expiryDate === "12/34" &&
      formData.cvv === "123";

    if (!isValidCard) {
      alert("Kart bilgileri hatalı. Lütfen test kartı kullan:\n4242 4242 4242 4242\n12/34 | 123");
      return;
    }

    const totalPrice = cart.reduce((sum, item) => {
      return sum + (parseFloat(item.price) || 0) * (item.quantity || 1);
    }, 0);

    console.log("🛒 Cart:", cart);
    console.log("💰 Toplam Tutar:", totalPrice);

    if (cart.length === 0) {
      alert("Sepet boş. Sipariş oluşturulamaz.");
      return;
    }

    const orderSuccess = await createOrder(parsedUser.id, cart, totalPrice);

    if (!orderSuccess) {
      alert("Sipariş oluşturulamadı. Daha sonra tekrar deneyin.");
      return;
    }

    console.log("✅ Sipariş oluşturuldu!");

    decreaseBalance(totalPrice);
    clearCart();
    router.push('/success');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-white to-purple-100 px-4">
      <div className="w-full max-w-4xl bg-white p-10 rounded-3xl shadow-2xl border border-purple-200 flex flex-col lg:flex-row items-center gap-12">

        {/* Kart Mockup */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <CardPreview
            name={formData.name}
            cardNumber={formData.cardNumber}
            expiry={formData.expiryDate}
            cvv={formData.cvv}
            focus={focused}
          />
          <p className="mt-6 text-sm text-gray-600 bg-gray-100 px-4 py-2 rounded-md text-center w-full max-w-xs">
            Test Kart: <b>4242 4242 4242 4242</b><br />
            SKT: <b>12/34</b> – CVV: <b>123</b>
          </p>
        </div>

        {/* Form Alanı */}
        <form onSubmit={handleSubmit} className="w-full lg:w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-purple-700 text-center mb-2">Ödeme Yap</h1>

          <input
            type="text"
            name="name"
            placeholder="Kart Üzerindeki İsim"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocused("name")}
            className="border border-purple-300 focus:ring-2 focus:ring-purple-500 p-3 rounded-md shadow-sm hover:shadow-md transition"
            required
          />

          <input
            type="text"
            name="cardNumber"
            placeholder="Kart Numarası"
            value={formData.cardNumber}
            onChange={handleChange}
            onFocus={() => setFocused("cardNumber")}
            className="border border-purple-300 focus:ring-2 focus:ring-purple-500 p-3 rounded-md tracking-wider shadow-sm hover:shadow-md transition"
            maxLength={19}
            required
          />

          <div className="flex gap-4">
            <input
              type="text"
              name="expiryDate"
              placeholder="SKT (12/34)"
              value={formData.expiryDate}
              onChange={handleChange}
              onFocus={() => setFocused("expiry")}
              className="border border-purple-300 focus:ring-2 focus:ring-purple-500 p-3 rounded-md w-1/2 shadow-sm hover:shadow-md transition"
              required
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={formData.cvv}
              onChange={handleChange}
              onFocus={() => setFocused("cvv")}
              className="border border-purple-300 focus:ring-2 focus:ring-purple-500 p-3 rounded-md w-1/2 shadow-sm hover:shadow-md transition"
              maxLength={3}
              required
            />
          </div>

          <Button
            type="submit"
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold py-3 rounded-xl transition-all duration-300"
          >
            💸 Ödemeyi Tamamla
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
