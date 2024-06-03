import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { MainLayout } from "@/layouts";
import { MAIN_PAGE_TITLE, MAIN_PAGE_DESCRIPTION } from "@/constants";
import "./globals.scss";

const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-family-roboto' });

export const metadata: Metadata = {
  title: MAIN_PAGE_TITLE,
  description: MAIN_PAGE_DESCRIPTION,
  twitter: {
    card: 'summary_large_image'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
