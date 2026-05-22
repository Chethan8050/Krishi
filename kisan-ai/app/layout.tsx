import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/PageTransition";
import NavbarWrapper from "@/components/NavbarWrapper";
import TopAppBar from "@/components/TopAppBar";
import ThemeProvider from "@/components/ThemeProvider";
import { AuthProvider } from "./components/AuthProvider";
import GoogleTranslate from "@/components/GoogleTranslate";

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
    <html lang="en" className={`dark ${inter.variable} ${outfit.variable}`} suppressHydrationWarning>
      <head>
        {/* Material Symbols icon font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-on-surface antialiased min-h-screen selection:bg-primary/30 selection:text-primary pb-28 md:pb-0" suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            <GoogleTranslate />
            <TopAppBar />
            <PageTransition>
              {children}
            </PageTransition>
            <NavbarWrapper />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
