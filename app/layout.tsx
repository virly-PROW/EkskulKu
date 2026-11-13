import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/NavBar";

export const metadata: Metadata = {
  title: {
    template: "%s · EkskulKu",
    default: "EkskulKu",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navbar />
        <main className="mx-auto max-w-5xl p-6">{children}</main>
      </body>
    </html>
  );
}