import { callType } from "@/lib/portal/schedule";
import type { Booking } from "@/lib/portal/schedule";
import { whenLabel } from "@/lib/portal/format";
import CancelButton from "./CancelButton";

export default function BookingCard({
  booking,
  meetLink,
  showClient,
  canCancel = true,
}: {
  booking: Booking;
  meetLink: string;
  showClient?: boolean;
  canCancel?: boolean;
}) {
  const type = callType(booking.callType);
  return (
    <li className="rounded-2xl border border-border bg-charcoal p-5">
      <p className="font-display text-xl text-cream">{whenLabel(booking.startsAt)}</p>
      <p className="mt-1 text-sm text-text-secondary">
        {type?.label ?? booking.callType} · {type?.minutes ?? ""} min · Google Meet
        {showClient ? ` · ${booking.clientCompany ?? booking.clientName}` : ""}
      </p>
      {booking.notes && <p className="mt-2 text-sm text-text-secondary">“{booking.notes}”</p>}
      <div className="mt-3 flex items-center justify-between gap-3">
        {meetLink ? (
          <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-sm text-gold underline-offset-4 hover:underline">
            Join on Google Meet
          </a>
        ) : (
          <span className="text-xs text-text-muted">Meet link comes from Elijah</span>
        )}
        {canCancel && <CancelButton id={booking.id} />}
      </div>
    </li>
  );
}
