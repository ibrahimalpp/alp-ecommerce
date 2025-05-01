'use client'

import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const { toast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/contact_messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (res.ok) {
        toast({
          title: "Başarılı!",
          description: "Mesajınız başarıyla alındı!",
          variant: "success",
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        toast({
          title: "Hata!",
          description: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Sunucu Hatası!",
        description: "Bir sorun oluştu. Daha sonra tekrar deneyin.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      
      {/* Başlık */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
          İletişime Geç
        </h1>
        <p className="text-gray-500 mt-4">
          Her türlü soru ve önerilerin için bize ulaşabilirsin. Cevaplamaktan mutluluk duyarız!
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        {/* İsim */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700 mb-1">İsim</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Adın Soyadın"
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* E-posta */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700 mb-1">E-posta</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@mail.com"
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Mesaj */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-sm font-semibold text-gray-700 mb-1">Mesajın</label>
          <textarea
            id="message"
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ne hakkında yazmak istersin?"
            className="border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Gönder Butonu */}
        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-full transition-all duration-300"
        >
          Mesajı Gönder
        </button>

      </form>

    </div>
  )
}

export default Page;
