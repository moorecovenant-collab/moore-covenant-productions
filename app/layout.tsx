import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import ChatWidget from "@/components/ui/ChatWidget";
import MusicPlayer from "@/components/ui/MusicPlayer";

export const metadata: Metadata = {
  title: "Moore Covenant Productions | Built on Covenant. Established for More.",
  description:
    "Moore Covenant Productions is a cinematic creative media company specializing in brand storytelling, videography, creative direction, and visual identity. We create moments people carry with them.",
  keywords: [
    "cinematic media",
    "brand storytelling",
    "videography",
    "creative direction",
    "visual identity",
    "social media management",
    "content strategy",
    "photography",
  ],
  openGraph: {
    title: "Moore Covenant Productions",
    description: "Built on Covenant. Established for More.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GrainOverlay />
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <MusicPlayer />
      </body>
    </html>
  );
}
