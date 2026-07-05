import type { Metadata } from "next";
import { Bebas_Neue, Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VCC — Void Cricket Club | The Ultimate Weapon. Unleashed.",
  description:
    "VCC (Void Cricket Club) hand-crafted English Willow cricket bats. Forged in darkness. Built for power. The ultimate weapon, unleashed.",
  keywords: [
    "VCC",
    "Void Cricket Club",
    "cricket bat",
    "English willow",
    "handcrafted cricket bat",
    "premium cricket bat",
  ],
  authors: [{ name: "Void Cricket Club" }],
  openGraph: {
    title: "VCC — Void Cricket Club",
    description: "The Ultimate Weapon. Unleashed.",
    siteName: "Void Cricket Club",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${bebas.variable} ${oswald.variable} ${inter.variable} ${jetMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
