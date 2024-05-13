import type { Metadata } from "next";
import "@/style/globals.css";

export const metadata: Metadata = {
  title: "undefined",
  description: "undefined",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
