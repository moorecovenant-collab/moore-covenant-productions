"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { signOut } from "@/app/(portal)/app/actions";

export default function SignOutButton() {
  const router = useRouter();
  const [pending, start] = useTransition();
  return (
    <button
      disabled={pending}
      onClick={() =>
        start(async () => {
          await signOut();
          router.replace("/app/login");
          router.refresh();
        })
      }
      className="w-full rounded-full border border-border py-3 text-sm text-text-primary transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
    >
      {pending ? "Signing out..." : "Sign out"}
    </button>
  );
}
