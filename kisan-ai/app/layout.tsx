import type { Metadata, Viewport } from "next";
import { Public_Sans } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
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
  themeColor: "#00450d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={publicSans.variable}>
      <head>
        {/* Material Symbols icon font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#f3f3f4] flex flex-col font-[var(--font-public-sans)] antialiased">
        {/* Truly Responsive Container */}
        <div className="relative mx-auto w-full flex-grow flex flex-col bg-[var(--color-background)] text-[var(--color-on-background)] 
          /* Desktop/Laptop: Full Webpage width with centered max-width for content */
          lg:max-w-screen-2xl
          /* Tablet: Wider 'Tab' centered view */
          md:max-w-[768px] md:shadow-lg md:my-4 md:rounded-xl md:border md:border-outline-variant
          /* Mobile: Full viewport app-style */
          sm:max-w-full sm:my-0 sm:rounded-none sm:border-none
        ">
          <div className="flex-grow overflow-y-auto overflow-x-hidden relative scrollbar-hide">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
