import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Garante que o Tailwind funcione 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClinicOps - Gestão Operacional",
  description: "Plataforma SaaS Multi-tenant para Clínicas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}