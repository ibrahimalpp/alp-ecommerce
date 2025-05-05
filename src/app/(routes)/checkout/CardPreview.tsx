'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface CardPreviewProps {
  cardNumber: string;
  name: string;
  expiry: string;
  cvv: string;
  focus: 'cardNumber' | 'name' | 'expiry' | 'cvv' | null;
}

const CardPreview: React.FC<CardPreviewProps> = ({
  cardNumber,
  name,
  expiry,
  cvv,
  focus,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // CVV inputu seçiliyse kartı çevir
  useEffect(() => {
    setIsFlipped(focus === 'cvv');
  }, [focus]);

  return (
    <div className="relative w-[320px] h-[200px] [perspective:1000px]">
      <motion.div
        className="relative w-full h-full rounded-xl text-white"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Ön Yüz */}
        <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-xs tracking-wider font-semibold">TEST CARD</span>
            <div className="w-10 h-6 bg-yellow-300 rounded-sm shadow-inner" />
          </div>
          <div className="text-xl tracking-widest font-mono">
            {cardNumber || '•••• •••• •••• ••••'}
          </div>
          <div className="flex justify-between text-sm">
            <span>{name || 'KART SAHİBİ'}</span>
            <span>{expiry || 'AA/YY'}</span>
          </div>
        </div>

        {/* Arka Yüz */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-900 rounded-xl p-5 flex flex-col justify-end">
          <div className="bg-white h-6 w-full mb-3" />
          <div className="text-right text-sm text-white">
            CVV: {cvv || '•••'}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CardPreview;
