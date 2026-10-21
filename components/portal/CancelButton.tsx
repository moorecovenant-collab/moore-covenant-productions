"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { cancelBooking } from "@/app/(portal)/app/actions";

export default function CancelButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() => {
        if (!confirm("Cancel this booking?")) return;
        start(async () => {
          await cancelBooking(id);
          router.refresh();
        });
      }}
      className="text-xs text-text-secondary underline-offset-4 hover:text-red-300 hover:underline disabled:opacity-50"
    >
      {pending ? "Cancelling..." : "Cancel"}
    </button>
  );
}
