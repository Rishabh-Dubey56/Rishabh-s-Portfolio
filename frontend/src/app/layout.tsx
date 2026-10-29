import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rishabh Dubey — Full-Stack Developer & Creative Technologist",
  description:
    "Portfolio of Rishabh Dubey — a full-stack developer crafting premium digital experiences with modern web technologies, 3D visuals, and creative engineering.",
  keywords: [
    "Rishabh Dubey",
    "Full-Stack Developer",
    "Portfolio",
    "Web Developer",
    "React",
    "Next.js",
    "Three.js",
    "Creative Technologist",
  ],
  authors: [{ name: "Rishabh Dubey" }],
  creator: "Rishabh Dubey",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Rishabh Dubey — Full-Stack Developer & Creative Technologist",
    description:
      "Portfolio of Rishabh Dubey — crafting premium digital experiences with modern web technologies.",
    siteName: "Rishabh Dubey Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Dubey — Full-Stack Developer",
    description:
      "Portfolio of Rishabh Dubey — crafting premium digital experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="noise-overlay min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
