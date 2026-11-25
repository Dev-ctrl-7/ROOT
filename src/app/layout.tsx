import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

import { LanguageProvider } from "@/lib/i18n/context";
import { ThemeProvider } from "@/lib/theme/context";
import { SidebarProvider } from "@/lib/sidebar/context";
import DiwaliNightSky from "@/components/DiwaliNightSky";
import MainContentWrapper from "@/components/MainContentWrapper";

export const metadata: Metadata = {
  title: "ROOTS — The Soul of India | Digital Memory Museum",
  description:
    "An interactive digital memory museum celebrating the living cultural heritage, architecture, culinary traditions, and sensory memories of all 28 Indian states and 8 union territories. Built for the Cloudinary November 2026 Mini-Hackathon.",
  keywords: [
    "India Heritage",
    "Roots the Soul of India",
    "Tamil Nadu",
    "Rajasthan",
    "Kerala",
    "Punjab",
    "West Bengal",
    "Cloudinary Hackathon",
    "Interactive Postcard",
    "Digital Museum",
  ],
  authors: [{ name: "ROOTS Engineering Team" }],
  openGraph: {
    title: "ROOTS — The Soul of India",
    description: "Every place has a story. Every story deserves to be felt.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(!sessionStorage.getItem('roots_entrance_seen')){document.documentElement.dataset.showEntrance='true';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-[#FAF8F5] text-[#2C241E] dark:bg-[#0C0A09] dark:text-[#F5EFEB] antialiased selection:bg-[#C59B27] selection:text-white flex flex-col font-sans transition-colors duration-300">
        <ThemeProvider>
          <SidebarProvider>
            <LanguageProvider>
              <DiwaliNightSky />
              <MainContentWrapper>
                {children}
              </MainContentWrapper>
            </LanguageProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
