import Link from "next/link";
import { redirect } from "next/navigation";
import PreviewBanner from "@/components/portal/PreviewBanner";
import TabBar from "@/components/portal/TabBar";
import { getSession } from "@/lib/portal/session";

export const dynamic = "force-dynamic";

export default async function ShellLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) redirect("/app/login");

  return (
    <>
      {session.previewing && <PreviewBanner name={session.name} />}
      <header
        className="sticky top-0 z-30 border-b border-border/60 bg-black/85 backdrop-blur-md"
        style={{ paddingTop: session.previewing ? 0 : "env(safe-area-inset-top)" }}
      >
        <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-5">
          <Link href="/app" className="flex items-center gap-3" aria-label="Home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/monogram_gold.png" alt="" className="h-7 w-auto" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary">
              {session.role === "admin" ? "Studio" : "Client Portal"}
            </span>
          </Link>
          <Link
            href="/app/account"
            aria-label="Account"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm text-cream hover:border-gold"
          >
            {session.name.charAt(0).toUpperCase()}
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-xl px-5 pt-6" style={{ paddingBottom: "calc(6rem + env(safe-area-inset-bottom))" }}>
        {children}
      </main>
      <TabBar role={session.role} />
    </>
  );
}
