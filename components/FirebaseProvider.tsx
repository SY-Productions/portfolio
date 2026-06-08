"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  getFirebaseAnalytics,
  getFirebasePerformance,
} from "@/app/lib/firebase";
import { logEvent } from "firebase/analytics";
import { useLang } from "@/app/context/LanguageContext";

/**
 * Initialises Firebase Analytics + Performance Monitoring once the app mounts,
 * then tracks every client-side navigation as a page_view event.
 * Also records page views in the local database for the admin analytics dashboard.
 *
 * Drop this into `app/layout.tsx` inside the body (no visible UI).
 */
export default function FirebaseProvider() {
  const pathname = usePathname();
  const { lang } = useLang();

  // Initialise on first mount — skip in development to avoid CORS errors from Firebase remote config
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    getFirebaseAnalytics().catch(() => null);
    getFirebasePerformance().catch(() => null);
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    // Firebase Analytics
    getFirebaseAnalytics().then((ga) => {
      if (!ga) return;
      logEvent(ga, "page_view", {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    });

    // Local database tracking
    fetch("/api/analytics/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, lang }),
    }).catch(() => null);
  }, [pathname, lang]);

  return null;
}
