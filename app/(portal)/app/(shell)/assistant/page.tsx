import ComingSoon from "@/components/portal/ComingSoon";
import PageHeader from "@/components/portal/PageHeader";
import { getSession } from "@/lib/portal/session";

export default async function Page() {
  const session = (await getSession())!;
  const admin = session.role === "admin";
  return (
    <>
      <PageHeader eyebrow="Assistant" title={admin ? "Assistant" : "Assistant"} />
      <ComingSoon title={admin ? "The same assistant from the website, now able to answer client questions about their own account and handle booking." : "Ask about your balance, your next call, pricing, or moving a booking. It only ever sees your account."}>{admin ? "" : ""}</ComingSoon>
    </>
  );
}
