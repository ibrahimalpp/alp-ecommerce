import type { CartItem } from "@/app/constans";
export async function createOrder(userId: string, cart: CartItem[], totalPrice: number) {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("❌ Giriş yapılmamış, token yok.");
      return false;
    }

    const orderBody = {
      user_id: userId,
      totalPrice,
      orderStatus: ["pending"],
      status: "published"
    };

    const orderRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderBody),
    });

    if (!orderRes.ok) {
      const errText = await orderRes.text();
      console.error("❌ Order POST error:", orderRes.status, errText);
      return false;
    }

    const orderData = await orderRes.json();
    const orderId = orderData.data.id;

    for (const item of cart) {
      const itemRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/orderitem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          order_id: orderId,
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          total: parseFloat(item.price) * (item.quantity || 1),
          status: "published"
        }),
      });

      if (!itemRes.ok) {
        const errText = await itemRes.text();
        console.error("❌ OrderItem hatası:", itemRes.status, errText);
        return false;
      }
    }

    console.log("✅ Sipariş ve ürünler başarıyla eklendi.");
    return true;

  } catch (error) {
    console.error("🚨 Sipariş sırasında genel hata:", error);
    return false;
  }
}
