import './globals.css';
import { Inter } from 'next/font/google';
export const metadata = { title: 'Antonius Chevillotte — Portfolio', description: 'Portfolio' };
const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-neutral-950 text-neutral-100`}>
        {children}
      </body>
    </html>
  );
}
