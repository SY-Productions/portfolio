"use client";

import { useEffect, useState, useCallback } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  RefreshCw,
  BarChart2,
  Users,
  Activity,
  Eye,
  TrendingUp,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContentStats {
  workSamples: number;
  education: number;
  works: number;
  events: number;
}

interface AnalyticsData {
  total: number;
  today: number;
  yesterday: number;
  weeklyViews: { day: string; date: string; views: number }[];
  topPages: { path: string; views: number }[];
  langDistribution: { name: string; value: number }[];
}

// ─── Colours ─────────────────────────────────────────────────────────────────

const CRIMSON_LIGHT = "#C44D55";
const CRIMSON = "#8B1E24";
const PIE_COLORS = ["#8B1E24", "#C44D55", "#E87E85", "#3B070A"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  sub,
  highlight,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-[#0D0D0D] border p-5 flex items-start gap-4 ${
        highlight ? "border-[#5A0E12]/60" : "border-white/10"
      }`}
    >
      <div
        className={`p-2.5 border ${
          highlight
            ? "bg-[#5A0E12]/40 border-[#8B1E24]/40"
            : "bg-[#3B070A]/30 border-[#5A0E12]/30"
        }`}
      >
        <Icon size={20} className="text-[#C44D55]" />
      </div>
      <div>
        <p className="text-white/40 text-xs mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {sub && <p className="text-white/30 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#0D0D0D] border border-white/10 p-5">
      <h3 className="text-white/60 text-sm font-medium mb-4">{title}</h3>
      {children}
    </div>
  );
}

const tooltipStyle = {
  contentStyle: {
    background: "#0D0D0D",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: 12,
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [stats, setStats] = useState<ContentStats>({
    workSamples: 0,
    education: 0,
    works: 0,
    events: 0,
  });
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [typeData, setTypeData] = useState<{ name: string; value: number }[]>(
    []
  );
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  const fetchAll = useCallback(async () => {
    setLoadingStats(true);
    setLoadingAnalytics(true);

    const [contentResult, analyticsResult] = await Promise.allSettled([
      (async () => {
        const [wsRes, eduRes, worksRes, eventsRes] = await Promise.all([
          fetch("/api/work-samples"),
          fetch("/api/education"),
          fetch("/api/works"),
          fetch("/api/events"),
        ]);
        const [ws, edu, works, events] = await Promise.all([
          wsRes.json(),
          eduRes.json(),
          worksRes.json(),
          eventsRes.json(),
        ]);
        const wsList: { isWeb: string }[] = Array.isArray(ws)
          ? ws
          : ws.data ?? [];
        return {
          workSamples: wsList.length,
          education: (Array.isArray(edu) ? edu : edu.data ?? []).length,
          works: (Array.isArray(works) ? works : works.data ?? []).length,
          events: (Array.isArray(events) ? events : events.data ?? []).length,
          webCount: wsList.filter((w) => w.isWeb === "1").length,
          mobileCount: wsList.filter((w) => w.isWeb === "0").length,
        };
      })(),
      fetch("/api/admin/analytics").then((r) => r.json()),
    ]);

    if (contentResult.status === "fulfilled") {
      const d = contentResult.value;
      setStats({
        workSamples: d.workSamples,
        education: d.education,
        works: d.works,
        events: d.events,
      });
      setTypeData([
        { name: "Web Apps", value: d.webCount },
        { name: "Mobile Apps", value: d.mobileCount },
      ]);
    }

    if (
      analyticsResult.status === "fulfilled" &&
      !analyticsResult.value.error
    ) {
      setAnalytics(analyticsResult.value as AnalyticsData);
    }

    setLoadingStats(false);
    setLoadingAnalytics(false);
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const trend =
    analytics && analytics.yesterday > 0
      ? Math.round(
          ((analytics.today - analytics.yesterday) / analytics.yesterday) * 100
        )
      : null;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart2 size={22} className="text-[#C44D55]" />
            Analytics
          </h2>
          <p className="text-white/40 text-sm mt-1">
            Real visitor data · auto-tracked on every page visit
          </p>
        </div>
        <button
          onClick={fetchAll}
          className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-sm transition-all"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Visitor stat cards */}
      <section>
        <h3 className="text-white/50 text-xs uppercase tracking-widest mb-3">
          Visitor Overview
        </h3>
        {loadingAnalytics ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-[#0D0D0D] border border-white/10 p-5 h-24 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Page Views"
              value={analytics?.total ?? 0}
              icon={Eye}
              sub="all time"
              highlight
            />
            <StatCard
              label="Today"
              value={analytics?.today ?? 0}
              icon={Activity}
              sub={
                trend !== null
                  ? `${trend >= 0 ? "+" : ""}${trend}% vs yesterday`
                  : `yesterday: ${analytics?.yesterday ?? 0}`
              }
            />
            <StatCard
              label="Yesterday"
              value={analytics?.yesterday ?? 0}
              icon={TrendingUp}
              sub="page views"
            />
            <StatCard
              label="This Week"
              value={
                analytics?.weeklyViews.reduce((s, d) => s + d.views, 0) ?? 0
              }
              icon={BarChart2}
              sub="last 7 days"
            />
          </div>
        )}
      </section>

      {/* Content stat cards */}
      <section>
        <h3 className="text-white/50 text-xs uppercase tracking-widest mb-3">
          Content Overview
        </h3>
        {loadingStats ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-[#0D0D0D] border border-white/10 p-5 h-24 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Work Samples"
              value={stats.workSamples}
              icon={Activity}
              sub="projects"
            />
            <StatCard
              label="Education"
              value={stats.education}
              icon={Users}
              sub="entries"
            />
            <StatCard
              label="Work Experience"
              value={stats.works}
              icon={Activity}
              sub="positions"
            />
            <StatCard
              label="Events / Certs"
              value={stats.events}
              icon={Activity}
              sub="entries"
            />
          </div>
        )}
      </section>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Weekly Page Views (last 7 days)">
          {loadingAnalytics ? (
            <div className="h-[220px] animate-pulse bg-white/5" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={analytics?.weeklyViews ?? []}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  allowDecimals={false}
                />
                <Tooltip {...tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke={CRIMSON_LIGHT}
                  strokeWidth={2}
                  dot={{ fill: CRIMSON, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Visitor Language Distribution">
          {loadingAnalytics ? (
            <div className="h-[220px] animate-pulse bg-white/5" />
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={
                    (analytics?.langDistribution ?? []).every(
                      (d) => d.value === 0
                    )
                      ? [{ name: "No data yet", value: 1 }]
                      : analytics?.langDistribution
                  }
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  dataKey="value"
                  label={({ name, percent }) =>
                    percent > 0.05
                      ? `${name} (${(percent * 100).toFixed(0)}%)`
                      : ""
                  }
                  labelLine={false}
                >
                  {(analytics?.langDistribution ?? []).map((_, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
                <Legend
                  wrapperStyle={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Top Pages">
          {loadingAnalytics ? (
            <div className="h-[260px] animate-pulse bg-white/5" />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart
                data={analytics?.topPages ?? []}
                layout="vertical"
                margin={{ left: 8 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.05)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                  allowDecimals={false}
                />
                <YAxis
                  type="category"
                  dataKey="path"
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                  width={90}
                />
                <Tooltip {...tooltipStyle} />
                <Bar dataKey="views" fill={CRIMSON} radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title="Work Sample Type Distribution">
          {loadingStats ? (
            <div className="h-[260px] animate-pulse bg-white/5" />
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={
                    typeData.every((d) => d.value === 0)
                      ? [{ name: "No data", value: 1 }]
                      : typeData
                  }
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} (${(percent * 100).toFixed(0)}%)`
                  }
                  labelLine={false}
                >
                  {(typeData.every((d) => d.value === 0)
                    ? [{ name: "No data", value: 1 }]
                    : typeData
                  ).map((_, index) => (
                    <Cell
                      key={index}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      {/* Firebase Console link */}
      <div className="bg-[#0D0D0D] border border-white/10 p-5 flex items-center justify-between">
        <div>
          <h3 className="text-white text-sm font-medium">
            Firebase Console
          </h3>
          <p className="text-white/40 text-xs mt-0.5">
            Access crash reports, performance monitoring, and advanced Firebase Analytics.
          </p>
        </div>
        <a
          href="https://console.firebase.google.com/project/youdexsof"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white text-sm transition-all whitespace-nowrap"
        >
          Open Console →
        </a>
      </div>
    </div>
  );
}

  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  RefreshCw,
  BarChart2,
  Users,
  Activity,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContentStats {
  workSamples: number;
  education: number;
  works: number;
  events: number;
}

interface TypeDistribution {
  name: string;
  value: number;
}

// ─── Colours ─────────────────────────────────────────────────────────────────

const CRIMSON = "#8B1E24";
const CRIMSON_LIGHT = "#C44D55";
const CRIMSON_DARK = "#5A0E12";
const PIE_COLORS = ["#8B1E24", "#C44D55", "#E87E85", "#3B070A"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  sub,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  sub?: string;
}) {
  return (
    <div className="bg-[#0D0D0D] border border-white/10 p-5 flex items-start gap-4">
      <div className="p-2.5 bg-[#3B070A]/30 border border-[#5A0E12]/30">
        <Icon size={20} className="text-[#C44D55]" />
      </div>
      <div>
        <p className="text-white/40 text-xs mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {sub && <p className="text-white/30 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Firebase GA4 note ────────────────────────────────────────────────────────
//
// Firebase Analytics data is processed by Google and is NOT directly queryable
// via client-side SDK — it requires the GA4 Reporting API with service-account
// credentials on the server side. What we CAN show client-side:
//   • Content stats from our own database
//   • A demo/placeholder for GA4 metrics (with a link to Firebase Console)
//
// Real-time GA4 charts can be added by creating an `/api/admin/analytics` route
// that calls the GA4 Data API with a service account.
// ─────────────────────────────────────────────────────────────────────────────

const DEMO_PAGE_VIEWS = [
  { day: "Mon", views: 40 },
  { day: "Tue", views: 65 },
  { day: "Wed", views: 55 },
  { day: "Thu", views: 80 },
  { day: "Fri", views: 70 },
  { day: "Sat", views: 90 },
  { day: "Sun", views: 60 },
];

const DEMO_LANG_DIST = [
  { name: "Persian (FA)", value: 62 },
  { name: "English (EN)", value: 28 },
  { name: "Arabic (AR)", value: 10 },
];

const DEMO_SECTION_VIEWS = [
  { name: "Home", visits: 100 },
  { name: "About", visits: 72 },
  { name: "Work Samples", visits: 88 },
  { name: "Education", visits: 45 },
  { name: "Skills", visits: 60 },
  { name: "Events", visits: 38 },
  { name: "Contact", visits: 55 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [stats, setStats] = useState<ContentStats>({
    workSamples: 0,
    education: 0,
    works: 0,
    events: 0,
  });
  const [typeData, setTypeData] = useState<TypeDistribution[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const [wsRes, eduRes, worksRes, eventsRes] = await Promise.all([
        fetch("/api/work-samples"),
        fetch("/api/education"),
        fetch("/api/works"),
        fetch("/api/events"),
      ]);
      const [ws, edu, works, events] = await Promise.all([
        wsRes.json(),
        eduRes.json(),
        worksRes.json(),
        eventsRes.json(),
      ]);

      const wsList: { isWeb: string }[] = Array.isArray(ws)
        ? ws
        : ws.data ?? [];
      const webCount = wsList.filter((w) => w.isWeb === "1").length;
      const mobileCount = wsList.filter((w) => w.isWeb === "0").length;

      setStats({
        workSamples: wsList.length,
        education: (Array.isArray(edu) ? edu : edu.data ?? []).length,
        works: (Array.isArray(works) ? works : works.data ?? []).length,
        events: (Array.isArray(events) ? events : events.data ?? []).length,
      });

      setTypeData([
        { name: "Web Apps", value: webCount },
        { name: "Mobile Apps", value: mobileCount },
      ]);
    } catch {
      // silently fail
    } finally {
      setLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <BarChart2 size={22} className="text-[#C44D55]" />
            Analytics
          </h2>
          <p className="text-white/40 text-sm mt-1">
            Portfolio content stats &amp; Firebase Analytics overview
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-sm transition-all"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Firebase note */}
      <div className="flex items-start gap-3 bg-[#3B070A]/20 border border-[#5A0E12]/30 px-4 py-3 text-sm text-white/60">
        <AlertCircle size={16} className="text-[#C44D55] mt-0.5 shrink-0" />
        <span>
          Real-time visitor data is collected via{" "}
          <strong className="text-white">Firebase Analytics (GA4)</strong>. Full
          reports are available in the{" "}
          <a
            href="https://console.firebase.google.com/project/youdexsof/analytics"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[#E87E85] hover:text-white"
          >
            Firebase Console
          </a>
          . The charts below show your portfolio content stats + demo
          breakdowns.
        </span>
      </div>

      {/* Content stat cards */}
      <section>
        <h3 className="text-white/50 text-xs uppercase tracking-widest mb-3">
          Content Overview
        </h3>
        {loadingStats ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-[#0D0D0D] border border-white/10 p-5 h-24 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Work Samples"
              value={stats.workSamples}
              icon={Activity}
              sub="projects"
            />
            <StatCard
              label="Education"
              value={stats.education}
              icon={Users}
              sub="entries"
            />
            <StatCard
              label="Work Experience"
              value={stats.works}
              icon={Activity}
              sub="positions"
            />
            <StatCard
              label="Events / Certs"
              value={stats.events}
              icon={Activity}
              sub="entries"
            />
          </div>
        )}
      </section>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Work sample type split */}
        <div className="bg-[#0D0D0D] border border-white/10 p-5">
          <h3 className="text-white/60 text-sm font-medium mb-4">
            Work Sample Type Distribution
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={
                  typeData.every((d) => d.value === 0)
                    ? [{ name: "No data", value: 1 }]
                    : typeData
                }
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                labelLine={false}
              >
                {(typeData.every((d) => d.value === 0)
                  ? [{ name: "No data", value: 1 }]
                  : typeData
                ).map((_, index) => (
                  <Cell
                    key={index}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0D0D0D",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Demo: Language distribution */}
        <div className="bg-[#0D0D0D] border border-white/10 p-5">
          <h3 className="text-white/60 text-sm font-medium mb-1">
            Visitor Language Distribution
            <span className="ml-2 text-xs text-[#C44D55] font-normal">
              (demo)
            </span>
          </h3>
          <p className="text-white/30 text-xs mb-4">
            Connect GA4 Reporting API to see real data.
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={DEMO_LANG_DIST}
                cx="50%"
                cy="50%"
                outerRadius={85}
                dataKey="value"
              >
                {DEMO_LANG_DIST.map((_, index) => (
                  <Cell
                    key={index}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0D0D0D",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: 12,
                }}
              />
              <Legend
                wrapperStyle={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Demo: Weekly page views */}
        <div className="bg-[#0D0D0D] border border-white/10 p-5">
          <h3 className="text-white/60 text-sm font-medium mb-1">
            Weekly Page Views
            <span className="ml-2 text-xs text-[#C44D55] font-normal">
              (demo)
            </span>
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={DEMO_PAGE_VIEWS}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              />
              <YAxis tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  background: "#0D0D0D",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke={CRIMSON_LIGHT}
                strokeWidth={2}
                dot={{ fill: CRIMSON, r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Demo: Section visits */}
        <div className="bg-[#0D0D0D] border border-white/10 p-5">
          <h3 className="text-white/60 text-sm font-medium mb-1">
            Section Engagement
            <span className="ml-2 text-xs text-[#C44D55] font-normal">
              (demo)
            </span>
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={DEMO_SECTION_VIEWS} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                type="number"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }}
                width={90}
              />
              <Tooltip
                contentStyle={{
                  background: "#0D0D0D",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="visits" fill={CRIMSON} radius={[0, 2, 2, 0]}>
                {DEMO_SECTION_VIEWS.map((_, index) => (
                  <Cell
                    key={index}
                    fill={index % 2 === 0 ? CRIMSON : CRIMSON_DARK}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Firebase Console embed link */}
      <div className="bg-[#0D0D0D] border border-white/10 p-5 flex items-center justify-between">
        <div>
          <h3 className="text-white text-sm font-medium">
            Full Firebase Console
          </h3>
          <p className="text-white/40 text-xs mt-0.5">
            Access real-time analytics, crash reports, performance monitoring,
            and more.
          </p>
        </div>
        <a
          href="https://console.firebase.google.com/project/youdexsof"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-[#3B070A]/60 hover:bg-[#5A0E12]/60 border border-[#5A0E12]/50 text-white text-sm transition-all whitespace-nowrap"
        >
          Open Console →
        </a>
      </div>
    </div>
  );
}
