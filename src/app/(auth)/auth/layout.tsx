/// authlayout.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import loginImage from '@/app/public/auth.jpg';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="h-screen flex">
      {/* Sol taraf - Resim */}
      <div className="hidden lg:block w-1/2 h-full">
        <Image
          alt="Login Image"
          src={loginImage}
          width={1080}
          height={1920}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Sağ taraf - Form */}
      <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center px-8">
        <div className="w-full max-w-md space-y-6">
          {children}
          <div className="text-center">
            <Link href="/" className="text-sm text-purple-600 hover:underline">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
