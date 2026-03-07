import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "RedaxGroup - სარემონტო მომსახურება თბილისში",
  description:
    "RedaxGroup - საიმედო სარემონტო მომსახურება, ინტერიერის დიზაინი და ავეჯის დამზადება თბილისში",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${playfair.variable} antialiased`}
        style={{ fontFamily: "'Noto Sans Georgian', sans-serif" }}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
