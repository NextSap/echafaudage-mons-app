import type { Metadata } from "next";
import "@/style/globals.css";
import {Toaster} from "@/components/ui/toaster";

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
      <body>
      {children}
      <Toaster/>
      </body>
    </html>
  );
}
