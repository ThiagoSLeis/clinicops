import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "ClinicOps",
  description: "Sistema de Gestão de Clínicas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      {/* O className tem que estar DENTRO da abertura da tag body, antes do sinal > */}
      <body className={cn("min-h-screen font-sans antialiased", fontSans.variable)}>
        {children}
      </body>
    </html>
  );
}