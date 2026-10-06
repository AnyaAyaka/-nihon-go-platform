import type { Metadata, Viewport } from "next";
import "./globals.css";
import InstallApp from "./InstallApp";

export const metadata: Metadata = {
  title: "Nihon GO! World",
  description: "JLPTの物語を読んで、力だめしを解いて、間違えたところを復習する。",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Nihon GO!",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#1C2226",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Zen+Old+Mincho:wght@400;700&family=Source+Serif+4:ital,wght@0,400;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <InstallApp />
        {children}
      </body>
    </html>
  );
}
