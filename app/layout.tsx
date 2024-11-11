import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import TopNav from '@/components/nav/top-nav';
import { ThemeProvider } from '@/context/theme';
import { UsageProvider } from '@/context/usage';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TextGenie.AI',
  description: 'AI Content Generator',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UsageProvider>
              <header>
                <TopNav />
              </header>
              <main>{children}</main>
            </UsageProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
