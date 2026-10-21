import Link from "next/link";
import InstallCard from "@/components/portal/InstallCard";
import { STUDIO_PHONE, STUDIO_SMS } from "@/lib/portal/config";
import { listClients, findClientById } from "@/lib/portal/clients";
import { listPendingLeads } from "@/lib/portal/leads";
import { serviceLabel } from "@/lib/portal/services";
import { invoiceState, money, whenLabel } from "@/lib/portal/format";
import { listInvoices } from "@/lib/portal/invoices";
import { callType, listUpcomingBookings } from "@/lib/portal/schedule";
import { getSession } from "@/lib/portal/session";

export const dynamic = "force-dynamic";

const TZ = "America/New_York";

function greeting() {
  const hour = Number(new Date().toLocaleString("en-US", { hour: "numeric", hour12: false, timeZone: TZ }));
  return hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
}
const today = () => new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: TZ });

const card = "rounded-2xl border border-border bg-charcoal p-5";
const label = "text-[10px] uppercase tracking-[0.2em] text-text-secondary mb-2";

export default async function Home() {
  const session = (await getSession())!;
  const first = session.name.split(" ")[0];

  const header = (
    <header className="mb-2">
      <p className={label}>{today()}</p>
      <h1 className="font-display text-4xl leading-tight text-cream">
        {greeting()}, {first}.
      </h1>
    </header>
  );

  if (session.role === "admin") {
    const [clients, bookings, invoices, leads] = await Promise.all([listClients(), listUpcomingBookings(), listInvoices(), listPendingLeads()]);
    const claims = invoices.filter((i) => i.status === "open" && i.claimedAt).length;
    const open = invoices.filter((i) => i.status === "open");
    const owed = open.reduce((n, i) => n + i.amountCents, 0);
    const overdue = open.filter((i) => invoiceState(i.status, i.dueDate) === "overdue").length;
    const next = bookings[0];
    return (
      <div className="space-y-4">
        {header}
        <InstallCard />
        {(leads.length > 0 || claims > 0) && (
          <Link href={leads.length > 0 ? "/app/clients" : "/app/pay"} className={`${card} block border-gold/50 bg-gold/[0.06]`}>
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gold">Needs you</p>
            {leads.length > 0 && <p className="text-cream">{leads.length} new client request{leads.length === 1 ? "" : "s"} to review</p>}
            {claims > 0 && <p className="text-cream">{claims} payment{claims === 1 ? "" : "s"} to confirm</p>}
          </Link>
        )}
        <Link href="/app/book" className={`${card} block transition-colors hover:border-gold/60`}>
          <p className={label}>Next call</p>
          {next ? (
            <>
              <p className="font-display text-2xl text-cream">{whenLabel(next.startsAt)}</p>
              <p className="mt-1 text-sm text-text-secondary">
                {next.clientCompany ?? next.clientName} · {callType(next.callType)?.label ?? next.callType}
                {bookings.length > 1 ? ` · ${bookings.length - 1} more after` : ""}
              </p>
            </>
          ) : (
            <p className="font-display text-2xl text-cream">Nothing booked</p>
          )}
        </Link>
        <Link href="/app/pay" className={`${card} block transition-colors hover:border-gold/60`}>
          <p className={label}>Outstanding</p>
          <p className="font-display text-2xl text-cream">{money(owed)}</p>
          <p className="mt-1 text-sm text-text-secondary">
            {open.length === 0 ? "Everyone is paid up." : `${open.length} open invoice${open.length === 1 ? "" : "s"}${overdue ? `, ${overdue} overdue` : ""}`}
          </p>
        </Link>
        <Link href="/app/clients" className={`${card} block transition-colors hover:border-gold/60`}>
          <p className={label}>Clients</p>
          <p className="font-display text-2xl text-cream">{clients.length}</p>
          <p className="mt-1 text-sm text-text-secondary">Add people, or open the app as one of them.</p>
        </Link>
      </div>
    );
  }

  const [bookings, invoices, me] = await Promise.all([listUpcomingBookings(session.clientId!), listInvoices(session.clientId!), findClientById(session.clientId!)]);
  const next = bookings[0];
  const open = invoices.filter((i) => i.status === "open");
  const owed = open.reduce((n, i) => n + i.amountCents, 0);
  const late = open.some((i) => invoiceState(i.status, i.dueDate) === "overdue");
  return (
    <div className="space-y-4">
      {header}
      <InstallCard />
      {me?.service && (
        <div className={card}>
          <p className={label}>Your service</p>
          <p className="font-display text-2xl text-cream">{serviceLabel(me.service)}</p>
        </div>
      )}
      <Link href="/app/book" className={`${card} block transition-colors hover:border-gold/60`}>
        <p className={label}>Next call</p>
        {next ? (
          <>
            <p className="font-display text-2xl text-cream">{whenLabel(next.startsAt)}</p>
            <p className="mt-1 text-sm text-text-secondary">{callType(next.callType)?.label ?? next.callType} over Google Meet</p>
          </>
        ) : (
          <>
            <p className="font-display text-2xl text-cream">Nothing booked</p>
            <p className="mt-1 text-sm text-gold">See open times</p>
          </>
        )}
      </Link>
      <Link href="/app/pay" className={`${card} block transition-colors hover:border-gold/60`}>
        <p className={label}>Balance</p>
        <p className="font-display text-2xl text-cream">{owed ? money(owed) : "All paid up"}</p>
        <p className={`mt-1 text-sm ${late ? "text-red-300" : "text-text-secondary"}`}>
          {owed ? (late ? "Part of this is past due. Tap to pay." : "Tap to pay or see invoices.") : "Nothing due right now."}
        </p>
      </Link>
      <div className={card}>
        <p className={label}>From the studio</p>
        <p className="text-sm leading-relaxed text-text-secondary">No updates right now. Deals and schedule changes show up here first.</p>
      </div>
      <a href={STUDIO_SMS} className="block rounded-full border border-border py-3.5 text-center text-sm text-cream transition-colors hover:border-gold hover:text-gold">
        Text Elijah {STUDIO_PHONE}
      </a>
    </div>
  );
}
