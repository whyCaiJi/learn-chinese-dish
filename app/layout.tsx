import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { LanguageToggle } from "@/components/LanguageToggle";

export const metadata: Metadata = {
  title: "学做菜 · Learn Chinese Cooking",
  description: "学做中餐，了解背后的原理 / Chinese recipes with the science behind them",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col bg-[#faf8f5]">
        <LangProvider>
          <LanguageToggle />
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
