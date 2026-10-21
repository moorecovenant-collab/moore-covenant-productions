import Link from "next/link";
import { redirect } from "next/navigation";
import PageHeader from "@/components/portal/PageHeader";
import { AwayForm, HoursForm, RemoveAway } from "@/components/portal/ScheduleSettings";
import { dateOnly } from "@/lib/portal/format";
import { getSchedule, listBlocked } from "@/lib/portal/schedule";
import { getSession } from "@/lib/portal/session";

export const dynamic = "force-dynamic";

export default async function ScheduleSettingsPage() {
  const session = (await getSession())!;
  if (session.role !== "admin") redirect("/app/book");
  const [schedule, blocked] = await Promise.all([getSchedule(), listBlocked()]);

  return (
    <>
      <Link href="/app/book" className="mb-4 inline-block text-sm text-text-secondary hover:text-gold">
        ← Schedule
      </Link>
      <PageHeader eyebrow="Studio" title="Hours and days off" />
      <div className="space-y-6">
        <HoursForm initial={schedule} />
        <AwayForm />
        {blocked.length > 0 && (
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-charcoal">
            {blocked.map((b) => (
              <li key={b.id} className="flex items-center justify-between px-5 py-3.5">
                <span className="text-sm text-cream">
                  {b.startDate === b.endDate ? dateOnly(b.startDate) : `${dateOnly(b.startDate)} to ${dateOnly(b.endDate)}`}
                </span>
                <RemoveAway id={b.id} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
