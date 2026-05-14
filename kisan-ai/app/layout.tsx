import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import NavbarWrapper from "@/components/NavbarWrapper";
import ThemeProvider from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KisanAI – Your Smart Crop Doctor",
  description:
    "AI-powered crop disease detection, yield prediction, and agricultural insights for every farmer.",
  keywords: ["KisanAI", "crop disease", "yield predictor", "agriculture AI", "farmer app"],
  authors: [{ name: "KisanAI Team" }],
  openGraph: {
    title: "KisanAI – Your Smart Crop Doctor",
    description: "AI-powered crop health insights for every farmer.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#065f46",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* Material Symbols icon font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#f1f5f9] flex flex-col antialiased" suppressHydrationWarning>
        <ThemeProvider>
          {/* Truly Responsive Container */}
          <div className="relative mx-auto w-full flex-grow flex flex-col bg-[var(--color-background)] text-[var(--color-on-background)] overflow-hidden">
            <PageTransition>
              <div className="flex-grow overflow-y-auto overflow-x-hidden relative scrollbar-hide">
                {children}
              </div>
            </PageTransition>
            <NavbarWrapper />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
