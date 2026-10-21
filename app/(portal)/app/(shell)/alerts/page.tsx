import clsx from "clsx";
import { AlertComposer, DeleteAlert, KIND_LABEL, when } from "@/components/portal/AlertComposer";
import PageHeader from "@/components/portal/PageHeader";
import PushToggle from "@/components/portal/PushToggle";
import SeenMarker from "@/components/portal/SeenMarker";
import { listClients } from "@/lib/portal/clients";
import { listAllAlerts, listAlertsForClient, unreadCount, type Alert } from "@/lib/portal/alerts";
import { getSession } from "@/lib/portal/session";

export const dynamic = "force-dynamic";

const CHIP: Record<Alert["kind"], string> = {
  deal: "border-gold text-gold",
  schedule: "border-sky-400/50 text-sky-300",
  news: "border-border text-text-secondary",
};

function AlertCard({ a, admin }: { a: Alert; admin: boolean }) {
  return (
    <li className="rounded-2xl border border-border bg-charcoal p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className={clsx("rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider", CHIP[a.kind])}>{KIND_LABEL[a.kind]}</span>
        <span className="text-xs text-text-muted">{when(a.createdAt)}</span>
      </div>
      <p className="font-display text-xl text-cream">{a.title}</p>
      <p className="mt-1 text-sm leading-relaxed text-text-secondary">{a.body}</p>
      {admin && (
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-text-muted">{a.clientName ? `Only ${a.clientName}` : "Everyone"}</span>
          <DeleteAlert id={a.id} />
        </div>
      )}
    </li>
  );
}

export default async function AlertsPage() {
  const session = (await getSession())!;
  const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? null;

  if (session.role === "admin") {
    const [alerts, clients] = await Promise.all([listAllAlerts(), listClients()]);
    return (
      <>
        <PageHeader eyebrow="Studio" title="Alerts" />
        <div className="space-y-6">
          <PushToggle publicKey={publicKey} />
          <AlertComposer clients={clients.map((c) => ({ id: c.id, name: c.name, company: c.company }))} />
          {alerts.length > 0 && (
            <section>
              <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-text-secondary">Sent</p>
              <ul className="space-y-3">
                {alerts.map((a) => (
                  <AlertCard key={a.id} a={a} admin />
                ))}
              </ul>
            </section>
          )}
        </div>
      </>
    );
  }

  const [alerts, unread] = await Promise.all([listAlertsForClient(session.clientId!), unreadCount(session.clientId!)]);
  return (
    <>
      <PageHeader eyebrow="Alerts" title="From the studio" />
      {!session.previewing && <SeenMarker unread={unread} />}
      <div className="space-y-6">
        <PushToggle publicKey={session.previewing ? null : publicKey} />
        {alerts.length === 0 ? (
          <p className="rounded-2xl border border-border bg-charcoal p-5 text-sm text-text-secondary">Nothing yet. Deals and schedule changes show up here first.</p>
        ) : (
          <ul className="space-y-3">
            {alerts.map((a) => (
              <AlertCard key={a.id} a={a} admin={false} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
