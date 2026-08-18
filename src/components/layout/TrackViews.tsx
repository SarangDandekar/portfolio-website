"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const VISITOR_KEY = "jugadu_visitor_key";

function getVisitorKey() {
  try {
    const existing = localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const created = crypto.randomUUID();
    localStorage.setItem(VISITOR_KEY, created);
    return created;
  } catch {
    return null;
  }
}

export function TrackViews() {
  const pathname = usePathname();

  useEffect(() => {
    const visitorKey = getVisitorKey();
    if (!visitorKey || !pathname) return;

    const sessionFlag = `jugadu_viewed:${pathname}`;
    try {
      if (sessionStorage.getItem(sessionFlag)) return;
      sessionStorage.setItem(sessionFlag, "1");
    } catch {
      /* still record once this mount */
    }

    void fetch("/api/view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, visitorKey }),
      keepalive: true,
    }).catch(() => undefined);
  }, [pathname]);

  return null;
}
