import clsx from "clsx";
import PageHeader from "@/components/portal/PageHeader";
import PayOptions from "@/components/portal/PayOptions";
import { InvoiceActions, InvoiceForm, PaymentSettingsForm } from "@/components/portal/InvoiceForm";
import { listClients } from "@/lib/portal/clients";
import { dateOnly, invoiceState, money, type InvoiceState } from "@/lib/portal/format";
import { listInvoices, type Invoice } from "@/lib/portal/invoices";
import { getPaymentSettings } from "@/lib/portal/payments";
import { getSession } from "@/lib/portal/session";

export const dynamic = "force-dynamic";

const CHIP: Record<InvoiceState, { text: string; cls: string }> = {
  paid: { text: "Paid", cls: "border-emerald-400/40 text-emerald-300" },
  void: { text: "Removed", cls: "border-border text-text-muted" },
  overdue: { text: "Overdue", cls: "border-red-400/50 text-red-300" },
  today: { text: "Due today", cls: "border-gold text-gold" },
  due: { text: "Upcoming", cls: "border-border text-text-secondary" },
};

function Row({ inv, admin }: { inv: Invoice; admin: boolean }) {
  const state = invoiceState(inv.status, inv.dueDate);
  return (
    <li className="px-5 py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-cream">{inv.description}</p>
          <p className="text-sm text-text-secondary">
            {admin ? `${inv.clientCompany ?? inv.clientName} · ` : ""}
            {inv.status === "paid" && inv.paidAt ? `Paid ${dateOnly(inv.paidAt.slice(0, 10))}` : `Due ${dateOnly(inv.dueDate, true)}`}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-display text-xl text-cream">{money(inv.amountCents)}</p>
          <span className={clsx("mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider", CHIP[state].cls)}>
            {CHIP[state].text}
          </span>
          {inv.status === "open" && inv.claimedAt && (
            <p className="mt-1 text-[11px] text-gold">{admin ? `Says paid by ${inv.claimedMethod}` : `Marked as sent by ${inv.claimedMethod}`}</p>
          )}
        </div>
      </div>
      {admin && (
        <div className="mt-3">
          <InvoiceActions id={inv.id} status={inv.status} />
        </div>
      )}
    </li>
  );
}

export default async function PayPage() {
  const session = (await getSession())!;
  const admin = session.role === "admin";
  const [invoices, payment] = await Promise.all([listInvoices(admin ? undefined : session.clientId!), getPaymentSettings()]);
  const owing = invoices.filter((i) => i.status === "open");
  const total = owing.reduce((n, i) => n + i.amountCents, 0);
  const overdue = owing.filter((i) => invoiceState(i.status, i.dueDate) === "overdue").reduce((n, i) => n + i.amountCents, 0);

  if (admin) {
    const clients = (await listClients()).map((c) => ({ id: c.id, name: c.name, company: c.company }));
    return (
      <>
        <PageHeader eyebrow="Studio" title="Payments" />
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-border bg-charcoal p-5">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-text-secondary">Outstanding</p>
              <p className="font-display text-3xl text-cream">{money(total)}</p>
            </div>
            <div className="rounded-2xl border border-border bg-charcoal p-5">
              <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-text-secondary">Overdue</p>
              <p className={clsx("font-display text-3xl", overdue ? "text-red-300" : "text-cream")}>{money(overdue)}</p>
            </div>
          </div>
          <InvoiceForm clients={clients} />
          <PaymentSettingsForm initial={payment} />
          {invoices.length > 0 && (
            <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-charcoal">
              {invoices.map((i) => (
                <Row key={i.id} inv={i} admin />
              ))}
            </ul>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader eyebrow="Pay" title="Payments" />
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-charcoal p-5">
          <p className="mb-1 text-[10px] uppercase tracking-[0.2em] text-text-secondary">{total ? "Balance due" : "Balance"}</p>
          <p className="font-display text-4xl text-cream">{total ? money(total) : "All paid up"}</p>
          {overdue > 0 && <p className="mt-1 text-sm text-red-300">{money(overdue)} is past due.</p>}
          {total > 0 && (
            <div className="mt-4">
              <PayOptions amountCents={total} settings={payment} alreadyClaimed={owing.every((i) => !!i.claimedAt)} readOnly={session.previewing} />
            </div>
          )}
        </div>
        {invoices.length > 0 ? (
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-charcoal">
            {invoices.map((i) => (
              <Row key={i.id} inv={i} admin={false} />
            ))}
          </ul>
        ) : (
          <p className="text-sm text-text-secondary">No invoices yet.</p>
        )}
      </div>
    </>
  );
}
