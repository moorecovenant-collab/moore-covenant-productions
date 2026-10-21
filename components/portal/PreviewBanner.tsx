"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { exitPreview } from "@/app/(portal)/app/actions";

export default function PreviewBanner({ name }: { name: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <div className="sticky top-0 z-40 bg-gold text-black" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="mx-auto flex max-w-xl items-center justify-between gap-3 px-5 py-2 text-sm">
        <span>
          Viewing as <strong>{name}</strong>. Read only.
        </span>
        <button
          disabled={pending}
          onClick={() =>
            start(async () => {
              await exitPreview();
              router.replace("/app/clients");
              router.refresh();
            })
          }
          className="rounded-full border border-black/40 px-3 py-1 text-xs font-medium disabled:opacity-50"
        >
          Exit
        </button>
      </div>
    </div>
  );
}
