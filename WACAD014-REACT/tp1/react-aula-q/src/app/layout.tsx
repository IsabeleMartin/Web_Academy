import Navbar from './components/Navbar/Navbar';
import type { Metadata } from 'next';
import "bootstrap/dist/css/bootstrap.min.css";

export const metadata: Metadata = {
  title: 'Loja WA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
