import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cute Stream Avatars - Twitch Chat Visualization",
  description: "A cute and interactive way to visualize Twitch chat with adorable emoticon avatars floating around your screen",
  keywords: "twitch, chat, avatars, streaming, cute, emoticons, visualization",
  authors: [{ name: "Stream Avatars" }],
  openGraph: {
    title: "Cute Stream Avatars",
    description: "Adorable chat visualization for Twitch streams",
    type: "website",
  },
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
