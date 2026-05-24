import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOptions";
import { redirect } from "next/navigation";
import prisma from "@/prisma/client";
import Link from "next/link";

async function getStats() {
  const [workSamples, educations, works, events] = await Promise.all([
    prisma.workSample.count(),
    prisma.education.count(),
    prisma.work.count(),
    prisma.event.count(),
  ]);
  return { workSamples, educations, works, events };
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  const stats = await getStats();

  const cards = [
    {
      title: "Work Samples",
      count: stats.workSamples,
      desc: "Portfolio projects",
      href: "/admin/work-samples",
      color: "from-[#3B070A]/40 to-[#5A0E12]/30",
    },
    {
      title: "Education",
      count: stats.educations,
      desc: "Academic records",
      href: "/admin/education",
      color: "from-[#0F3D3E]/40 to-[#1B5B5C]/30",
    },
    {
      title: "Works",
      count: stats.works,
      desc: "Work experience",
      href: "/admin/works",
      color: "from-[#1a1a3e]/40 to-[#2a2a6e]/30",
    },
    {
      title: "Events",
      count: stats.events,
      desc: "Events & certificates",
      href: "/admin/events",
      color: "from-[#1a3a1a]/40 to-[#2a6a2a]/30",
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-white/50 mt-1">
          Welcome back. Manage your portfolio content.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`bg-gradient-to-br ${card.color} border border-white/10 hover:border-white/20 p-6
                        transition-all duration-300 hover:-translate-y-1 group`}
          >
            <div className="text-4xl font-bold text-white mb-2">
              {card.count}
            </div>
            <div className="text-lg font-semibold text-white/80">
              {card.title}
            </div>
            <div className="text-sm text-white/40 mt-1">{card.desc}</div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 border border-white/10 bg-white/5">
        <h3 className="text-lg font-semibold text-white mb-2">Quick Tips</h3>
        <ul className="text-white/50 text-sm space-y-1 list-disc list-inside">
          <li>Use the Up / Down buttons in each section to reorder items.</li>
          <li>
            Pictures field accepts space-separated relative paths (e.g.{" "}
            <code>/portfolio/img1.png /portfolio/img2.png</code>).
          </li>
          <li>
            Technologies / Technos should be comma-separated (e.g.{" "}
            <code>Flutter,Dart,Firebase</code>).
          </li>
          <li>
            For Work Samples, set <strong>isWeb</strong> to <code>1</code> for
            web projects or <code>0</code> for mobile.
          </li>
        </ul>
      </div>
    </div>
  );
}
