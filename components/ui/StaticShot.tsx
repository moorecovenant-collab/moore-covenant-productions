"use client";

import { useEffect } from "react";

/** Test hook: `?static=1` forces every reveal/animation to its final state so headless screenshots show the full page. */
export default function StaticShot() {
  useEffect(() => {
    try {
      if (new URLSearchParams(window.location.search).has("static")) {
        document.documentElement.classList.add("static-shot");
      }
    } catch {}
  }, []);
  return null;
}
