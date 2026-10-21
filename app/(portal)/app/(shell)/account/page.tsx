import PageHeader from "@/components/portal/PageHeader";
import SignOutButton from "@/components/portal/SignOutButton";
import { getSession } from "@/lib/portal/session";

export default async function AccountPage() {
  const session = (await getSession())!;
  return (
    <>
      <PageHeader eyebrow={session.role === "admin" ? "Studio" : "Client"} title="Account" />
      <div className="mb-6 rounded-2xl border border-border bg-charcoal p-5">
        <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-text-secondary">Signed in as</p>
        <p className="font-display text-2xl text-cream">{session.name}</p>
        <p className="text-sm text-text-secondary">{session.email}</p>
      </div>
      <SignOutButton />
    </>
  );
}
