import type { Metadata } from "next";
import {Inter} from "next/font/google"
import "./globals.css";
import { QueryProvider } from "@/components/query-provider";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Jira Clon",
  description: "Adminstracion de Proyectos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "antialiased min-h-screen")}
      >
        <QueryProvider>
          <Toaster/>
          {children}
        </QueryProvider>  
      </body>
    </html>
  );
}
