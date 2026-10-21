import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/portal/LoginForm";
import { devAuthEnabled } from "@/lib/portal/config";
import { getSession } from "@/lib/portal/session";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await getSession()) redirect("/app");
  return (
    <div
      className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-6"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/monogram_gold.png" alt="Moore Covenant Productions" className="mb-8 h-16 w-auto" />
        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-gold">Client Portal</p>
        <h1 className="font-display text-4xl leading-tight text-cream">Welcome back.</h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Sign in with the email you gave Elijah. We send a code, so there is no password to remember.
        </p>
      </div>
      <LoginForm dev={devAuthEnabled} />
      <p className="mt-10 text-center text-sm text-text-secondary">
        New here?{" "}
        <Link href="/app/start" className="text-gold underline-offset-4 hover:underline">
          Request to work with us
        </Link>
      </p>
    </div>
  );
}
