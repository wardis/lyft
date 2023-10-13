import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SupabaseProvider from "./supabase-provider";
import Navbar from "@/components/ui/Navbar";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"min-h-screen bg-background" + inter.className}>
        <SupabaseProvider>
          <Providers>
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-4 px-6 flex-grow">
                {children}
              </main>
              <footer className="w-full flex items-center justify-center py-3">
                <span className="text-default-600">
                  Made with love by&nbsp;
                </span>
                <p className="text-primary"> Lyft</p>
              </footer>
            </div>
          </Providers>
        </SupabaseProvider>
      </body>
    </html>
  );
}
