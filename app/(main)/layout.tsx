import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ui/ChatWidget";
import MusicPlayer from "@/components/ui/MusicPlayer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      <main>{children}</main>
      <Footer />
      <ChatWidget />
      <MusicPlayer />
    </>
  );
}
