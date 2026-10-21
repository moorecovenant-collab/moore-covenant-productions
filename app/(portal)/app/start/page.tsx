import Link from "next/link";
import { redirect } from "next/navigation";
import StartForm from "@/components/portal/StartForm";
import { getSession } from "@/lib/portal/session";

export const dynamic = "force-dynamic";

export default async function StartPage() {
  if (await getSession()) redirect("/app");
  return (
    <div className="mx-auto max-w-md px-6 pb-16" style={{ paddingTop: "calc(3rem + env(safe-area-inset-top))" }}>
      <div className="mb-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/monogram_gold.png" alt="Moore Covenant Productions" className="mb-6 h-14 w-auto" />
        <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-gold">Work with us</p>
        <h1 className="font-display text-4xl leading-tight text-cream">Let's build something.</h1>
        <p className="mt-3 text-sm leading-relaxed text-text-secondary">
          Tell us about you and what you need. Elijah reviews every request, then you pay and book right here in the app.
        </p>
      </div>
      <StartForm />
      <p className="mt-8 text-center text-sm text-text-secondary">
        Already a client?{" "}
        <Link href="/app/login" className="text-gold underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
