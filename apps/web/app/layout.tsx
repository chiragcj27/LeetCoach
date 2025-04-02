import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import "@workspace/ui/globals.css"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LeetCoach - Your AI Companion for LeetCode',
  description: 'Master LeetCode problems with personalized AI guidance and support.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}