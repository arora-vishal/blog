import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Learning Journal",
  description: "A blog documenting my personal learning journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <nav className="bg-white shadow-md">
          <div className="max-w-4xl mx-auto px-8 py-4">
            <div className="flex justify-between items-center">
              <a href="/" className="text-xl font-bold">
                Learning Journal
              </a>
              <div className="space-x-4">
                <a href="/" className="hover:text-blue-600">
                  Home
                </a>
                <a href="/about" className="hover:text-blue-600">
                  About
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
} 