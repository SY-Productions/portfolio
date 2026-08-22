import type { Metadata } from "next";
import Link from "next/link";
import BlogAppBar from "@/components/Blog/BlogAppBar";
import { API_ENDPOINTS, API_POLICY, DEVELOPER_RESOURCES } from "@/lib/api-catalog";
import { CONTACT, OWNER, SITE_NAME, SITE_URL } from "@/lib/site-profile";

/**
 * Developer index for the public read-only API.
 *
 * The product name appears in the title and in every top-level heading on
 * purpose: agents and search engines look these resources up by name
 * ("Youdexsof API docs"), and a page titled "Docs" is unfindable that way.
 */

const TITLE = `${SITE_NAME} Developer Resources — API Documentation`;
const DESCRIPTION = `Public, read-only ${SITE_NAME} API: blog posts, portfolio projects, work history, education, events, products and pinned GitHub repositories. OpenAPI 3.1 spec, no authentication required.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "Youdexsof API",
    "Youdexsof API documentation",
    "Youdexsof developer resources",
    "Youdexsof OpenAPI",
    "Yousof Hashemzade API",
    "portfolio API",
  ],
  alternates: { canonical: "/developers" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "/developers",
  },
};

const POLICY_ROWS: [string, string][] = [
  ["Authentication", API_POLICY.authentication],
  ["Write access", API_POLICY.writes],
  ["Rate limits", API_POLICY.rateLimit],
  ["CORS", API_POLICY.cors],
  ["Formats", API_POLICY.formats],
];

export default function DevelopersPage() {
  return (
    <>
      <BlogAppBar label="Developers" />
      <main className="pt-20 pb-16 section-shell" dir="ltr">
        <article className="glass-card max-w-4xl mx-auto p-6 sm:p-10 text-left">
          <header className="mb-10">
            <h1 className="section-title in-view mb-4 whitespace-normal">
              {SITE_NAME} Developer Resources
            </h1>
            <p className="font-[ybn] text-white/60 leading-8 2xl:text-lg">
              {DESCRIPTION}
            </p>
            <p className="font-[ybn] text-white/40 leading-7 text-sm mt-3">
              Published by {OWNER.name} ({OWNER.nameFa}) at{" "}
              <code>{SITE_URL}</code>.
            </p>
            <span className="block mt-5 w-16 h-[2px] bg-gradient-to-r from-[#3A0D12] to-[#3B070A]" />
          </header>

          <section className="mb-12">
            <h2 className="font-[ybb] text-white/80 text-xl mb-4">
              {SITE_NAME} API endpoints
            </h2>
            <p className="font-[ybn] text-white/60 leading-8 mb-6">
              Every endpoint is a <code>GET</code> relative to{" "}
              <code>{SITE_URL}</code> and returns JSON.
            </p>
            <ul className="space-y-6">
              {API_ENDPOINTS.map((endpoint) => (
                <li
                  key={endpoint.operationId}
                  className="border-s-2 border-white/10 ps-4"
                >
                  <h3 className="font-[ybb] font-normal text-white/90 text-base lg:text-lg mb-2">
                    <code>GET {endpoint.path}</code>
                  </h3>
                  <p className="font-[ybn] text-white/60 leading-7 mb-2">
                    {endpoint.description}
                  </p>
                  {endpoint.query?.length || endpoint.pathParams?.length ? (
                    <dl className="font-[ybn] text-white/50 text-sm space-y-1">
                      {[
                        ...(endpoint.pathParams ?? []),
                        ...(endpoint.query ?? []),
                      ].map((param) => (
                        <div key={param.name} className="flex gap-2">
                          <dt className="text-white/70">
                            <code>{param.name}</code>
                          </dt>
                          <dd>{param.description}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="font-[ybb] text-white/80 text-xl mb-4">
              {SITE_NAME} API access policy
            </h2>
            <dl className="space-y-4">
              {POLICY_ROWS.map(([term, definition]) => (
                <div key={term}>
                  <dt className="font-[ybb] text-white/70 text-sm mb-1">
                    {term}
                  </dt>
                  <dd className="font-[ybn] text-white/60 leading-7">
                    {definition}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mb-12">
            <h2 className="font-[ybb] text-white/80 text-xl mb-4">
              {SITE_NAME} machine-readable documents
            </h2>
            <ul className="space-y-3">
              {DEVELOPER_RESOURCES.map((resource) => (
                <li key={resource.url}>
                  <a
                    href={resource.url}
                    className="font-[ybb] text-white/80 hover:text-white transition-colors"
                  >
                    {resource.name}
                  </a>
                  <p className="font-[ybn] text-white/50 text-sm leading-7">
                    {resource.description}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-[ybb] text-white/80 text-xl mb-4">
              {SITE_NAME} API support
            </h2>
            <p className="font-[ybn] text-white/60 leading-8">
              Questions, bug reports, or a request for an endpoint that does not
              exist yet: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
              The <Link href="/contact">contact page</Link> lists phone and
              Telegram as well.
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
