'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, LogOut, UserCircle, Wallet, Heart, Package } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

const UserButton = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    router.push('/auth/login');
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative group">
          {user?.avatar ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${user.avatar}`}
              alt="avatar"
              width={32}
              height={32}
              className="rounded-full border-2 border-purple-500 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-purple-400"
            />
          ) : (
            <User className="w-5 h-5 text-gray-500 hover:text-purple-500 transition" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-52 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm p-2 animate-fadeScale shadow-xl"
      >
        {user ? (
          <>
            <div className="px-3 py-2">
              <p className="text-sm font-semibold">👋 Merhaba, {user.first_name}</p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => router.push('/profile')} className="gap-2">
              <UserCircle className="w-4 h-4" />
              Profilim
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push('/topup')} className="gap-2">
              <Wallet className="w-4 h-4" />
              Bakiye Yükle
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push('/favorites')} className="gap-2">
              <Heart className="w-4 h-4 text-pink-500" />
              Favorilerim
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => router.push('/orders')} className="gap-2">
              <Package className="w-4 h-4" />
              Siparişlerim
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 gap-2 hover:bg-red-100 hover:animate-shake"
            >
              <LogOut className="w-4 h-4" />
              Çıkış Yap
            </DropdownMenuItem>
          </>
        ) : (
          <div className="px-3 py-4 text-center">
            <p className="text-sm font-bold text-purple-600">🚀 Hemen Katıl!</p>
            <Button
              variant="secondary"
              className="w-full mt-2 bg-purple-500 text-white hover:bg-purple-600"
              onClick={() => router.push('/auth/login')}
            >
              Giriş Yap
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
