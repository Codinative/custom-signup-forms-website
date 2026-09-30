"use client";

import { useEffect } from "react";

/** Old in-page anchors that moved to their own routes (hash URLs never reach the server). */
export function HashRedirect({ map }: { map: Record<string, string> }) {
  useEffect(() => {
    const redirect = () => {
      const target = map[window.location.hash];
      if (target) window.location.replace(target);
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, [map]);
  return null;
}
