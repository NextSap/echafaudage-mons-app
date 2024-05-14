import type { Metadata } from "next";
import "@/style/globals.css";
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Echafaudage Mons - Devis",
  description: "Demandez votre devis gratuitement !",
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
