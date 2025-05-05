'use client';

import { useEffect, useState } from 'react';
import { CreditCard, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const OrdersPage = () => {
  const [orders, setOrders] = useState<any[]>([]); // Başlangıçta boş array
  const [loading, setLoading] = useState(true);   // Yükleniyor durumunu ekledik

  useEffect(() => {
    const fetchData = async () => {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('access_token');

      if (!userData || !token) return;
      const { id } = JSON.parse(userData);

      // Siparişleri çek
      const orderRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/items/order?filter[user_id][_eq]=${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const orderData = await orderRes.json();

      if (!orderData.data) return; // Eğer order verisi yoksa çık

      setOrders(orderData.data);

      setLoading(false); // Yükleme bitince `loading` false yapıyoruz
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg font-bold">Yükleniyor... Lütfen bekleyin</div>; // Yüklenirken gösterilecek mesaj
  }

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">📦 Siparişlerim</h1>
      {orders.length === 0 ? (
        <p className="text-center text-lg">Henüz siparişiniz yok. Alışveriş yaparak ekonomiyi canlandırabilirsiniz! 🛒</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg shadow-md p-5 bg-white/80 backdrop-blur-md"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg font-semibold flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-purple-500" />
                  Toplam Tutar: <span>{Number(order.totalPrice).toFixed(2)}₺</span>
                </p>
                <Badge variant="outline" className="text-purple-600 border-purple-400">
                  <Clock className="w-3 h-3 mr-1 inline" />
                  {order.orderStatus?.[0] === 'pending' ? 'Beklemede' : order.orderStatus?.[0]}
                </Badge>
              </div>

              {/* Ürün kısmını kaldırdık, sadece sipariş bilgilerini gösteriyoruz */}
              <div className="mt-3 ml-2">
                <p className="font-medium mb-1 text-gray-700">Sipariş Durumu:</p>
                <p className="text-gray-500">{order.orderStatus?.[0]}</p> {/* Sipariş durumu */}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
