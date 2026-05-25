import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/authOptions";
import prisma from "@/prisma/client";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const all = await prisma.pageView.findMany({
      orderBy: { createdAt: "asc" },
    });

    const now = new Date();

    // Today (local midnight → now)
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const viewsToday = all.filter(
      (v) => new Date(v.createdAt) >= todayStart,
    ).length;

    // Yesterday
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    const viewsYesterday = all.filter(
      (v) =>
        new Date(v.createdAt) >= yesterdayStart &&
        new Date(v.createdAt) < todayStart,
    ).length;

    // Last 7 days — group by date string "YYYY-MM-DD"
    const sevenDaysAgo = new Date(todayStart);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const last7 = all.filter((v) => new Date(v.createdAt) >= sevenDaysAgo);

    const byDay: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(todayStart);
      d.setDate(d.getDate() - i);
      byDay[d.toISOString().slice(0, 10)] = 0;
    }
    last7.forEach((v) => {
      const key = new Date(v.createdAt).toISOString().slice(0, 10);
      if (key in byDay) byDay[key] = (byDay[key] || 0) + 1;
    });
    const weeklyViews = Object.entries(byDay).map(([date, views]) => ({
      day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
      date,
      views,
    }));

    // Top pages
    const pathCounts: Record<string, number> = {};
    all.forEach((v) => {
      pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
    });
    const topPages = Object.entries(pathCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([path, views]) => ({ path: path || "/", views }));

    // Language distribution
    const langCounts: Record<string, number> = { fa: 0, en: 0, ar: 0 };
    all.forEach((v) => {
      if (v.lang in langCounts) langCounts[v.lang]++;
    });
    const langDistribution = [
      { name: "Persian (FA)", value: langCounts.fa },
      { name: "English (EN)", value: langCounts.en },
      { name: "Arabic (AR)", value: langCounts.ar },
    ];

    return NextResponse.json({
      total: all.length,
      today: viewsToday,
      yesterday: viewsYesterday,
      weeklyViews,
      topPages,
      langDistribution,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
