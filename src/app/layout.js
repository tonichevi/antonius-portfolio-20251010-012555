import './globals.css';

export const metadata = {
  title: 'Antonius Chevillotte — Portfolio',
  description: 'Portfolio of Antonius (Toni) Chevillotte',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-black text-zinc-100">
        {children}
      </body>
    </html>
  );
}
