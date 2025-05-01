'use client';

import { Wallet } from "lucide-react";
import { useEffect, useState } from "react";

const WalletBalance = () => {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const userData = localStorage.getItem('user');
      const balanceData = localStorage.getItem('balance');
      if (userData) {
        setUser(JSON.parse(userData));
      }
      if (balanceData) {
        setBalance(parseFloat(balanceData));
      }
    }
  }, []);

  if (!isClient || !user) {
    return null; // Kullanıcı yoksa hiçbir şey gösterme
  }

  return (
    <div className="hidden sm:flex items-center gap-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
      <Wallet className="w-4 h-4" />
      <span>₺{balance.toFixed(2)}</span>
    </div>
  );
};

export default WalletBalance;
