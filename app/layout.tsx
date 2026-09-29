import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { seo } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: seo.siteName,
  description: seo.description,

  openGraph: {
    title: seo.siteName,
    description: seo.description,
    url: seo.url,
    siteName: seo.siteName,

    images: [
      {
        url: seo.image,
        width: 1200,
        height: 630,
      },
    ],

    locale: "fr_FR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: seo.siteName,
    description: seo.description,
    images: [seo.image],
  },

  alternates: {
    canonical: seo.url,
  },

  metadataBase: new URL(
    seo.url
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
