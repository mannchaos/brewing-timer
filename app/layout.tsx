import type { Metadata, Viewport } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-monaSans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brew Timer",
  description: "Coffee brewing timer",
  manifest: "/app/manifest.json",
  icons: {
    icon: [
      { url: "/favicons/favicon.ico" },
      { url: "/favicons/icon1.png", type: "image/png" },
      { url: "/favicons/icon0.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/favicons/apple-icon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#2131ab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${monaSans.variable} font-sans antialiased`}>
      <meta name="theme-color" content="#2131ab" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <body className={`antialiased`}>
        <div className="bg-site-blue-dark mx-auto min-h-dvh w-full max-w-112.5">{children}</div>
      </body>
    </html>
  );
}
