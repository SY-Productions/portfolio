import { logEvent, Analytics } from "firebase/analytics";
import { getFirebaseAnalytics } from "./firebase";

let analyticsInstance: Analytics | null = null;

async function analytics(): Promise<Analytics | null> {
  if (analyticsInstance) return analyticsInstance;
  analyticsInstance = await getFirebaseAnalytics();
  return analyticsInstance;
}

// ── Page & Navigation ──────────────────────────────────────────────────────

export async function trackPageView(pageName: string, pageUrl?: string) {
  const ga = await analytics();
  if (!ga) return;
  logEvent(ga, "page_view", {
    page_title: pageName,
    page_location: pageUrl ?? window.location.href,
    page_path: pageUrl ?? window.location.pathname,
  });
}

// ── Language ───────────────────────────────────────────────────────────────

export async function trackLanguageChange(lang: string) {
  const ga = await analytics();
  if (!ga) return;
  logEvent(ga, "language_change", { lang });
}

// ── Theme ──────────────────────────────────────────────────────────────────

export async function trackThemeChange(theme: string) {
  const ga = await analytics();
  if (!ga) return;
  logEvent(ga, "theme_change", { theme });
}

// ── Portfolio / WorkSamples ────────────────────────────────────────────────

export async function trackWorkSampleView(
  sampleTitle: string,
  sampleId: number,
) {
  const ga = await analytics();
  if (!ga) return;
  logEvent(ga, "work_sample_view", {
    sample_title: sampleTitle,
    sample_id: sampleId,
  });
}

export async function trackWorkSampleLinkClick(
  sampleTitle: string,
  link: string,
) {
  const ga = await analytics();
  if (!ga) return;
  logEvent(ga, "work_sample_link_click", { sample_title: sampleTitle, link });
}

// ── Contact Form ───────────────────────────────────────────────────────────

export async function trackContactFormSubmit(subject?: string) {
  const ga = await analytics();
  if (!ga) return;
  logEvent(ga, "contact_form_submit", { subject: subject ?? "unknown" });
}

export async function trackContactFormOpen() {
  const ga = await analytics();
  if (!ga) return;
  logEvent(ga, "contact_form_open");
}

// ── CV Download ────────────────────────────────────────────────────────────

export async function trackCvDownload() {
  const ga = await analytics();
  if (!ga) return;
  logEvent(ga, "cv_download");
}

// ── Section Visibility (scroll tracking) ──────────────────────────────────

export async function trackSectionView(sectionName: string) {
  const ga = await analytics();
  if (!ga) return;
  logEvent(ga, "section_view", { section_name: sectionName });
}

// ── Error Reporting ────────────────────────────────────────────────────────

export async function trackError(errorMessage: string, context?: string) {
  const ga = await analytics();
  if (!ga) return;
  logEvent(ga, "app_error", {
    error_message: errorMessage.substring(0, 100),
    context: context ?? "unknown",
  });
}

// ── Search (admin) ─────────────────────────────────────────────────────────

export async function trackAdminSearch(query: string, section: string) {
  const ga = await analytics();
  if (!ga) return;
  logEvent(ga, "admin_search", { query: query.substring(0, 50), section });
}
