import type { Metadata } from "next";
import { Geist, Geist_Mono, Audiowide, Italianno } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const audiowide = Audiowide({
  variable: "--font-audiowide",
  weight: "400",
  subsets: ["latin"],
});

const italianno = Italianno({
  variable: "--font-italianno",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kang Foto | ESTD 2019",
  description: "Professional Photography Services - Capturing Your Moments with Excellence since 2019.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
