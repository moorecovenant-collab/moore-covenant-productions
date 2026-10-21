import type { Metadata, Viewport } from "next";
import SwRegister from "@/components/portal/SwRegister";

export const metadata: Metadata = {
  title: "Client Portal | Moore Covenant Productions",
  description: "Book time, follow your projects, and keep up with payments.",
  manifest: "/app.webmanifest",
  robots: { index: false, follow: false },
  appleWebApp: { capable: true, title: "MCP", statusBarStyle: "black-translucent" },
  icons: { icon: "/app-icons/icon-192.png", apple: "/app-icons/apple-touch-icon.png" },
  openGraph: { title: "Moore Covenant Productions Client Portal", images: [] },
  twitter: { card: "summary", title: "Moore Covenant Productions Client Portal", images: [] },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#080808",
};

export default function PortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-[100dvh] bg-black text-text-primary">
      <SwRegister />
      {children}
    </div>
  );
}
