import type { Metadata } from "next";
import { IBM_Plex_Mono, Lexend } from "next/font/google";
import "./globals.css";

const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "IFome",
  description: "Sistema de gestão da cantina do IFMA Campus Grajaú",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${lexend.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
