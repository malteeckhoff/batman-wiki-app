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
  title: "Batman Wiki Explorer - Latest Batman Articles from Wikipedia",
  description: "Discover the most recent Batman-related articles, news, and content from Wikipedia. Stay up-to-date with the Dark Knight's universe including comics, movies, TV shows, and characters.",
  keywords: ["Batman", "Wikipedia", "Dark Knight", "Bruce Wayne", "Gotham City", "DC Comics", "Batman articles"],
  authors: [{ name: "Batman Wiki Explorer" }],
  creator: "Batman Wiki Explorer",
  publisher: "Batman Wiki Explorer",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://batman-wiki-explorer.vercel.app",
    title: "Batman Wiki Explorer - Latest Batman Articles",
    description: "Discover the most recent Batman-related articles from Wikipedia",
    siteName: "Batman Wiki Explorer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Batman Wiki Explorer - Latest Batman Articles",
    description: "Discover the most recent Batman-related articles from Wikipedia",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.classList.toggle(
                'dark',
                localStorage.theme === 'dark' ||
                  (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
              );
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
