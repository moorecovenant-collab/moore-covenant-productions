import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import ChatWidget from "@/components/ui/ChatWidget";
import MusicPlayer from "@/components/ui/MusicPlayer";
import MetroLine from "@/components/ui/MetroLine";
import StaticShot from "@/components/ui/StaticShot";

export const metadata: Metadata = {
  metadataBase: new URL("https://moorecovenantproductions.com"),
  title: "Moore Covenant Productions | Built on Covenant. Established for More.",
  description:
    "Social media management, cinematic video production, and websites for founders, ministries, creators, and local businesses in Washington DC, Maryland, and Virginia. Founded by Elijah Moore.",
  keywords: [
    "social media management DC",
    "video production Washington DC",
    "content creation DMV",
    "brand strategy",
    "website design Maryland",
    "cinematic content",
    "short-form video",
    "Moore Covenant Productions",
    "Elijah Moore",
  ],
  openGraph: {
    title: "Moore Covenant Productions",
    description: "Social media, cinematic content, and websites. Built on Covenant. Established for More.",
    type: "website",
    url: "https://moorecovenantproductions.com",
    images: [{ url: "/og/metro-ride.jpg", width: 1200, height: 630, alt: "Moore Covenant Productions. Built on Covenant. Established for More." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Moore Covenant Productions",
    description: "Social media, cinematic content, and websites. Built on Covenant. Established for More.",
    images: ["/og/metro-ride.jpg"],
  },
  verification: {
    google: "vI2PWS90Z9nDDxH1i6HjLpttsTjnsByEk5ecvti0mzw",
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
        <StaticShot />
        <GrainOverlay />
        <CustomCursor />
        <MetroLine />
        <Navigation />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
        <MusicPlayer />
      </body>
    </html>
  );
}
