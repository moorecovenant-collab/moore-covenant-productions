import ComingSoon from "@/components/portal/ComingSoon";
import PageHeader from "@/components/portal/PageHeader";
import { getSession } from "@/lib/portal/session";

export default async function Page() {
  const session = (await getSession())!;
  const admin = session.role === "admin";
  return (
    <>
      <PageHeader eyebrow="Alerts" title={admin ? "Alerts" : "Alerts"} />
      <ComingSoon title={admin ? "Post a deal, a schedule change, or a heads up. It reaches the people you choose as a push notification and sits in their feed." : "Deals, schedule changes, and news from the studio land here, and on your phone as a notification."}>{admin ? "" : ""}</ComingSoon>
    </>
  );
}
