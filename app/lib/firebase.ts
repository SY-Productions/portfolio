import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyBvH7z7yuw-pgAxYb2FcCQ0dXTIaotcRlQ",
  authDomain: "youdexsof.firebaseapp.com",
  projectId: "youdexsof",
  storageBucket: "youdexsof.firebasestorage.app",
  messagingSenderId: "1040761112180",
  appId: "1:1040761112180:web:940447f6dbc124a7967321",
  measurementId: "G-K9TCHLY6Z7",
};

// Reuse app if already initialized (Next.js hot-reload safe)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export { app };

/** Lazily initialise Analytics (browser-only). Returns null on server or unsupported browsers. */
export async function getFirebaseAnalytics() {
  if (typeof window === "undefined") return null;
  try {
    const supported = await isSupported();
    if (!supported) return null;
    return getAnalytics(app);
  } catch {
    return null;
  }
}

/** Lazily initialise Performance Monitoring (browser-only). */
export async function getFirebasePerformance() {
  if (typeof window === "undefined") return null;
  try {
    return getPerformance(app);
  } catch {
    return null;
  }
}
