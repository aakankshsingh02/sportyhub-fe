import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css"; // Global styles
import Menu from "@/src/Menu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sportyhub",
  description: "A blog platform for sharing and reading posts.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Menu />
        <main>{children}</main>
      </body>
    </html>
  );
}
