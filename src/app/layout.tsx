import type { Metadata } from "next";
import { Noto_Serif_SC, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif_SC({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const notoSans = Noto_Sans_SC({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "阿垚在洛杉矶 | 美西深度旅行",
  description: "深度旅行指南，带走比游客照更有意义的东西",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${notoSerif.variable} ${notoSans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
