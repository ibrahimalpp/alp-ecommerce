"use client";

import { useBalanceStore } from "@/store/balanceStore";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const TopUpPage = () => {
  const { balance, setBalance } = useBalanceStore();
  const router = useRouter();
  const [amount, setAmount] = useState<number>(0);

  const handleTopup = (extra: number) => {
    const newBalance = balance + extra;
    setBalance(newBalance);

    toast({
      title: "Bakiye Yüklendi!",
      description: `Yeni Bakiyen: ₺${newBalance.toFixed(2)}`,
    });

    router.push('/');
  };

  const handleManualTopup = () => {
    if (amount <= 0) {
      toast({
        title: "Hatalı Tutar",
        description: "Lütfen geçerli bir tutar gir.",
        variant: "destructive",
      });
      return;
    }
    handleTopup(amount);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-6 p-8">
      <h1 className="text-3xl font-bold">Bakiye Yükle</h1>

      <div className="flex flex-col gap-4 w-full max-w-sm">
        <Button onClick={() => handleTopup(500)}>₺500 Yükle</Button>
        <Button onClick={() => handleTopup(1000)}>₺1000 Yükle</Button>
        <Button onClick={() => handleTopup(2000)}>₺2000 Yükle</Button>

        <div className="flex flex-col gap-2 mt-6">
          <Input
            type="number"
            placeholder="Özel Tutar (₺)"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button onClick={handleManualTopup}>
            Özel Tutar Yükle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TopUpPage;
