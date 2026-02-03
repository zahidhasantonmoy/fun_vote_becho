import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <link href="https://banglawebfonts.pages.dev/css/charukola.css" rel="stylesheet" />
      </head>
      <body
        className={`font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
