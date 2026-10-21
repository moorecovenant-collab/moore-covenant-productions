"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { previewAs } from "@/app/(portal)/app/actions";

export default function ViewAsButton({ clientId }: { clientId: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() =>
        start(async () => {
          const r = await previewAs(clientId);
          if (r.ok) {
            router.replace("/app");
            router.refresh();
          }
        })
      }
      className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs text-cream transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
    >
      View as
    </button>
  );
}
