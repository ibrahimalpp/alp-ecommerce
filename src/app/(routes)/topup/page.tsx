'use client';

import { useBalanceStore } from "@/store/balanceStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

const TopUpPage = () => {
  const { balance, setBalance } = useBalanceStore();
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handleTopup = () => {
    const cleanCard = cardNumber.replace(/\s/g, "");

    if (
      cleanCard !== "4242424242424242" ||
      expiry !== "12/34" ||
      cvv !== "123"
    ) {
      toast({
        title: "Kart Bilgileri Hatalı",
        description: "Lütfen geçerli örnek kart bilgilerini kullan.",
        variant: "destructive",
      });
      return;
    }

    if (amount <= 0) {
      toast({
        title: "Geçersiz Tutar",
        description: "Yükleme miktarı sıfırdan büyük olmalı.",
        variant: "destructive",
      });
      return;
    }

    const newBalance = balance + amount;
    setBalance(newBalance);

    toast({
      title: "✅ Bakiye Yüklendi!",
      description: `Yeni Bakiye: ₺${newBalance.toFixed(2)}`,
    });

    router.push("/");
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-[90vh] gap-12 p-8">
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/credit-card-example.png"
          alt="Kart Görseli"
          width={400}
          height={250}
          className="rounded-lg shadow-xl"
        />
        <div className="text-sm bg-gray-100 rounded-md p-4">
          <p><b>Kart No:</b> 4242 4242 4242 4242</p>
          <p><b>SKT:</b> 12/34</p>
          <p><b>CVV:</b> 123</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center">💸 Kartla Bakiye Yükle</h1>

        <Input
          type="number"
          placeholder="Yüklenecek Tutar (₺)"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Input
          placeholder="Kart Numarası"
          value={cardNumber}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
            const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
            setCardNumber(formatted);
          }}
          maxLength={19}
        />
        <div className="flex gap-4">
          <Input
            placeholder="SKT (12/34)"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <Input
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength={3}
          />
        </div>

        <Button onClick={handleTopup}>Yükleme Yap</Button>
      </div>
    </div>
  );
};

export default TopUpPage;
