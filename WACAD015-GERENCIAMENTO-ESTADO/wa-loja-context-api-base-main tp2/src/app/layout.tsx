"use client"

import { AuthProvider } from "./contextos/AuthContexto";
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
        <AuthProvider>
          <FavoritesProvider>
            <Navbar />
            {children}
            <BootstrapClient />
          </FavoritesProvider>
        </AuthProvider>
      </body> 
    </html>
  );
}
