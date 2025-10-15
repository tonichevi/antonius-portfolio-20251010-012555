export const metadata = { title: "Antonius Chevillotte — Portfolio", description: "Portfolio" };
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
