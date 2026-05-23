import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "루틴캐시",
  description: "돈 때문에 미뤘던 장면을 이번 달 목표로 바꾸는 목표 기반 부업 루틴 앱",
  applicationName: "루틴캐시",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKr.variable} h-full`}>
      <body className="min-h-full bg-app-bg font-sans text-app-text antialiased">
        {children}
      </body>
    </html>
  );
}
