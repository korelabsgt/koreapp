import { AppBackground } from "@/components/(base)/layout/AppBackground";
import Header from "@/components/(base)/layout/header";
import Providers from "@/components/(base)/providers/QueryProviders";
import { UserProvider } from "@/components/(base)/providers/UserProvider";
import { ThemeProvider } from "@/components/(base)/theme/provider";
import { createClient } from "@/utils/supabase/server";
import * as motion from "framer-motion/client";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "KOREapp",
  description: "Sistema Integral de Gestión - Kore",
  other: {
    google: "notranslate",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "KOREapp",
  },
  icons: {
    icon: "/kore/logo.png",
    apple: "/kore/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col relative bg-black`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <AppBackground />
            <UserProvider user={user}>
              <Header />
              <main className="relative z-10 flex w-full flex-1 flex-col">
                {children}
              </main>
              <footer className="relative z-10 mt-auto w-full bg-transparent">
                <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-2 px-4 pt-0.5 pb-2 text-center md:flex-row md:items-center md:justify-between md:px-8 md:pt-1 md:pb-2 md:text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-wrap items-center justify-center gap-2"
                  >
                    <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-500 md:text-[10px]">
                      Powered by
                    </span>
                    <span className="inline-flex items-center rounded-md border border-primary/40 bg-primary/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-primary md:text-[10px]">
                      KORE
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col items-center gap-1 md:items-end"
                  >
                    <p className="text-[10px] font-bold text-white md:text-xs">
                      © 2026 Sistemas y Gobernanza Jiménez & Pinto S.A.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500 md:text-[10px]">
                        KOREAPP | Software Engineering
                      </span>
                      <span className="inline-flex items-center rounded-md border border-primary/40 bg-primary/15 px-2 py-0.5 text-[9px] font-black text-primary md:text-[10px]">
                        v0.1.0
                      </span>
                    </div>
                  </motion.div>
                </div>
              </footer>
            </UserProvider>
          </ThemeProvider>
        </Providers>
        <Script
          src="https://cdn.lordicon.com/lordicon.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
