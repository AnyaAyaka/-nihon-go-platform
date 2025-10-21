import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nihon GO! World",
  description: "Japanese language learning platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
