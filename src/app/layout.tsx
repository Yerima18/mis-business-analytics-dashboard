import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Analytics Dashboard · Lafia Adam Bagri",
  description:
    "MIS portfolio project by Lafia Adam Bagri (International student in Turkey). Built with Next.js, Tailwind, and Recharts.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">{children}</body>
    </html>
  );
}
