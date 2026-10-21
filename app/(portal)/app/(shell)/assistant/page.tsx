import AssistantChat from "@/components/portal/AssistantChat";
import PageHeader from "@/components/portal/PageHeader";
import { getSession } from "@/lib/portal/session";

export const dynamic = "force-dynamic";

export default async function AssistantPage() {
  const session = (await getSession())!;
  return (
    <>
      <PageHeader eyebrow={session.role === "admin" ? "Studio" : "Assistant"} title={session.role === "admin" ? "Your assistant" : "Studio assistant"} />
      <AssistantChat role={session.role} name={session.name} previewing={session.previewing} />
    </>
  );
}
