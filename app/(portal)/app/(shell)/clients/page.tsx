import { redirect } from "next/navigation";
import InviteForm from "@/components/portal/InviteForm";
import LeadsPanel from "@/components/portal/LeadsPanel";
import PageHeader from "@/components/portal/PageHeader";
import ViewAsButton from "@/components/portal/ViewAsButton";
import { listClients } from "@/lib/portal/clients";
import { listPendingLeads } from "@/lib/portal/leads";
import { serviceLabel } from "@/lib/portal/services";
import { getSession } from "@/lib/portal/session";

const seen = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "America/New_York" }) : "Not yet";

export default async function ClientsPage() {
  const session = (await getSession())!;
  if (session.role !== "admin") redirect("/app");
  const [clients, leads] = await Promise.all([listClients(), listPendingLeads()]);

  return (
    <>
      <PageHeader eyebrow="Studio" title="Clients" />
      <div className="space-y-6">
        <LeadsPanel leads={leads} />
        <InviteForm />
        <section>
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-text-secondary">{clients.length} invited</p>
          {clients.length === 0 ? (
            <p className="text-sm text-text-secondary">No clients yet. Add the first one above.</p>
          ) : (
            <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-charcoal">
              {clients.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-cream">{c.name}</p>
                    <p className="truncate text-sm text-text-secondary">{c.company ? `${c.company} · ` : ""}{c.email}</p>
                    {c.service && <p className="truncate text-xs text-text-muted">{serviceLabel(c.service)}</p>}
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <ViewAsButton clientId={c.id} />
                    <p className="text-xs text-text-muted">Last in: {seen(c.lastSeenAt)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
