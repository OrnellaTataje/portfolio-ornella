import type { Metadata } from "next";
import { Space_Grotesk, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-bodoni-moda",
});

export const metadata: Metadata = {
  title: "Ornella Isabel Tataje Falcon | Visual Designer",
  description: "Portfolio di Visual Designer & Content Creator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${bodoniModa.variable} antialiased bg-[#111111] text-[#ffffff]`}
      >
        {children}
      </body>
    </html>
  );
}