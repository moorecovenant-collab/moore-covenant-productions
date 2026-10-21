"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { markAlertsSeen } from "@/app/(portal)/app/actions";

/** Opening the feed counts as reading it, so the badge clears. */
export default function SeenMarker({ unread }: { unread: number }) {
  const router = useRouter();
  useEffect(() => {
    if (unread > 0) markAlertsSeen().then(() => router.refresh());
  }, [unread, router]);
  return null;
}
