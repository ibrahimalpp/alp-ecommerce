import { createDirectus, rest, registerUser } from '@directus/sdk';
import { NextResponse } from 'next/server';

const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL as string).with(rest());

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // email ve password sırası DÜZGÜN OLMALI
    const result = await client.request(
      registerUser(email, password, {
        first_name: name, // ekstra bilgi
      })
    );



    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Kayıt olurken hata oluştu:", error);
    return NextResponse.json({ success: false, message: error?.message || "Bilinmeyen hata" }, { status: 500 });
  }
}
