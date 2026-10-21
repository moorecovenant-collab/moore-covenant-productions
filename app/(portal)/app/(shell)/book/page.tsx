import Link from "next/link";
import BookingCard from "@/components/portal/BookingCard";
import BookingFlow from "@/components/portal/BookingFlow";
import PageHeader from "@/components/portal/PageHeader";
import { calendarConnected } from "@/lib/portal/busy";
import { dateOnly } from "@/lib/portal/format";
import { CALL_TYPES, availableSlots, getSchedule, listBlocked, listUpcomingBookings } from "@/lib/portal/schedule";
import { getSession } from "@/lib/portal/session";

export const dynamic = "force-dynamic";

export default async function BookPage() {
  const session = (await getSession())!;
  const schedule = await getSchedule();

  if (session.role === "admin") {
    const [bookings, blocked] = await Promise.all([listUpcomingBookings(), listBlocked()]);
    return (
      <>
        <PageHeader eyebrow="Studio" title="Schedule" />
        <div className="space-y-6">
          <Link href="/app/book/settings" className="block rounded-full border border-gold py-3 text-center text-sm text-gold">
            Edit hours and days off
          </Link>

          <section>
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-text-secondary">Upcoming ({bookings.length})</p>
            {bookings.length === 0 ? (
              <p className="rounded-2xl border border-border bg-charcoal p-5 text-sm text-text-secondary">No calls booked yet.</p>
            ) : (
              <ul className="space-y-3">
                {bookings.map((b) => (
                  <BookingCard key={b.id} booking={b} meetLink={schedule.meetLink} showClient />
                ))}
              </ul>
            )}
          </section>

          <section className="rounded-2xl border border-border bg-charcoal p-5">
            <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-text-secondary">Days off</p>
            {blocked.length === 0 ? (
              <p className="text-sm text-text-secondary">None set.</p>
            ) : (
              <ul className="space-y-1 text-sm text-cream">
                {blocked.map((b) => (
                  <li key={b.id}>{b.startDate === b.endDate ? dateOnly(b.startDate) : `${dateOnly(b.startDate)} to ${dateOnly(b.endDate)}`}</li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-xs text-text-muted">
              Google Calendar: {calendarConnected() ? "connected, busy times are blocked automatically." : "not connected yet."}
            </p>
          </section>
        </div>
      </>
    );
  }

  const types = CALL_TYPES.map(({ id, label, minutes, blurb }) => ({ id, label, minutes, blurb }));
  const [mine, ...slotLists] = await Promise.all([
    listUpcomingBookings(session.clientId!),
    ...CALL_TYPES.map((t) => availableSlots(t.minutes)),
  ]);
  const daysByType = Object.fromEntries(CALL_TYPES.map((t, i) => [t.id, slotLists[i]]));

  return (
    <>
      <PageHeader eyebrow="Book" title="Book time with Elijah" />
      <div className="space-y-8">
        {mine.length > 0 && (
          <section>
            <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-text-secondary">Your calls</p>
            <ul className="space-y-3">
              {mine.map((b) => (
                <BookingCard key={b.id} booking={b} meetLink={schedule.meetLink} canCancel={!session.previewing} />
              ))}
            </ul>
          </section>
        )}
        <BookingFlow types={types} daysByType={daysByType} readOnly={session.previewing} />
      </div>
    </>
  );
}
