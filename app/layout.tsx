import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "学做菜",
  description: "学做中餐，了解背后的原理",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col bg-[#faf8f5]">{children}</body>
    </html>
  );
}
