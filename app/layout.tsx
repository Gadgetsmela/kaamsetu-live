import "./globals.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KaamSetu",
  description: "Local work hiring app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-10 border-b bg-white">
          <div className="container-mobile flex items-center justify-between py-3">
            <Link href="/" className="font-bold text-brand-700">KaamSetu</Link>
            <nav className="flex gap-3 text-sm">
              <Link href="/jobs">Jobs</Link>
              <Link href="/worker/dashboard">Worker</Link>
              <Link href="/owner/dashboard">Owner</Link>
            </nav>
          </div>
        </header>
        <main className="container-mobile py-4">{children}</main>
      </body>
    </html>
  );
}
