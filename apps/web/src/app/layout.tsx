'use client';
import { useEffect, useState } from 'react';
import './globals.css';
import ThemeButton from './dashboard/cms/mode'; // Import your ThemeButton component
import QueryProvider from '@/utils/provider/QueryProvider';
import { UserProvider } from '@/contexts/UserContext';
import { Navbar } from './layout/navbar';
import LiveChat from './dashboard/cms/chat';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from './layout/footer';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <UserProvider>
            <Navbar />
            <LiveChat />
            <main> {children} </main>
            <Footer /> 
          </UserProvider>
        </QueryProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
