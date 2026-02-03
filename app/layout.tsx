import type { Metadata } from "next";
import { Baloo_Da_2 } from "next/font/google";
import "./globals.css";

const balooDa2 = Baloo_Da_2({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo-da-2",
});

export const metadata: Metadata = {
  title: "ভোট-বেচো ডট কম | VoteBecho",
  description: "ভোট দিন, বিরিয়ানি নিন! একটি স্যাটায়ারিক্যাল ভোট কেনা-বেচার প্ল্যাটফর্ম।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${balooDa2.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
