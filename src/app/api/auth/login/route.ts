import { createDirectus, authentication, rest, readMe } from '@directus/sdk';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const client = createDirectus(process.env.NEXT_PUBLIC_DIRECTUS_URL as string)
      .with(authentication())
      .with(rest());

    // Önce login yap
    const loginResult = await client.login(email, password);

    if (!loginResult.access_token) {
      return NextResponse.json(
        { success: false, message: "Giriş başarısız." },
        { status: 401 }
      );
    }

    // Şimdi access token ile kullanıcı bilgisi çekiyoruz
    const user = await client.request(readMe());

    return NextResponse.json({
      success: true,
      access_token: loginResult.access_token,
      refresh_token: loginResult.refresh_token,
      expires: loginResult.expires,
      user: user // 🔥 artık user bilgisi burada!
    });
  } catch (error: any) {
    console.error("Login API Hatası:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Sunucu hatası oluştu." },
      { status: 500 }
    );
  }
}
