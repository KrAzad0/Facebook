import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Niche Network",
  description: "Connection-driven social platform built with Next.js + Prisma + PostgreSQL"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
