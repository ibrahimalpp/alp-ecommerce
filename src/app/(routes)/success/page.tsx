'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Animasyon için
import { PartyPopper } from "lucide-react"; // Havalı ikon

const SuccessPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 bg-gradient-to-b from-white via-purple-100 to-white">
      
      {/* İkon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="text-purple-600 mb-6"
      >
        <PartyPopper size={80} className="mx-auto" />
      </motion.div>

      {/* Başlık */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4"
      >
        Ödeme Başarılı!
      </motion.h1>

      {/* Açıklama */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 text-lg"
      >
        Siparişin başarıyla alındı. Teşekkür ederiz!
      </motion.p>

      {/* Butonlar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-lg rounded-full transition-all duration-300">
            Anasayfaya Dön 🚀
          </Button>
        </Link>

        <Link href="/product">
          <Button variant="outline" className="px-6 py-3 text-lg rounded-full border-purple-600 text-purple-600 hover:bg-purple-100 transition-all duration-300">
            Alışverişe Devam 🛒
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
