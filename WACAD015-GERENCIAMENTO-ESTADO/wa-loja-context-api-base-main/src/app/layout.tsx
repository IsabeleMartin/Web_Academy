"use client"
import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import BootstrapClient from "./components/BootstrapClient";
import Navbar from "./components/Navbar/Navbar";
import { FavoritesProvider } from "./contextos/FavoritosProvider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <FavoritesProvider>
          <Navbar />
          {children}
          <BootstrapClient />
        </FavoritesProvider>
      </body>
    </html>
  );
}
