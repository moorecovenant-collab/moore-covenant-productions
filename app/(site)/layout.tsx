import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GrainOverlay from "@/components/ui/GrainOverlay";
import CustomCursor from "@/components/ui/CustomCursor";
import ChatWidget from "@/components/ui/ChatWidget";
import MusicPlayer from "@/components/ui/MusicPlayer";
import MetroLine from "@/components/ui/MetroLine";
import StaticShot from "@/components/ui/StaticShot";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StaticShot />
      <GrainOverlay />
      <CustomCursor />
      <MetroLine />
      <Navigation />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
      <MusicPlayer />
    </>
  );
}
