'use client'

import React from 'react';
import Footer from "./_components/Footer";
import Header from "./_components/Menu/Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className='min-h-screen'>{children}</div>
      <Footer />
    </>
  );
};

export default AuthLayout;
