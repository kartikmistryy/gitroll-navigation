import { ClipboardList, Gauge, Timer, Flame } from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card } from "@/components/ui/card";
import { stats, weeklyActivity, recentActivity } from "@/lib/data";
import type { Stat, ActivityItem } from "@/lib/data";

// Map icon key → lucide component
const iconMap: Record<Stat["icon"], ComponentType<LucideProps>> = {
  clipboard: ClipboardList,
  gauge: Gauge,
  timer: Timer,
  flame: Flame,
};

// Format total hours: drop trailing ".0"
function formatHours(total: number): string {
  const rounded = Math.round(total * 10) / 10;
  return `${rounded} hrs`;
}

// Dot color by activity type
function dotColor(type: ActivityItem["type"]): string {
  if (type === "assignment") return "bg-accent";
  if (type === "skill") return "bg-[#34C759]";
  return "bg-[#FF9500]"; // hackathon
}

export default function OverviewPage() {
  const totalHours = weeklyActivity.reduce((sum, d) => sum + d.hours, 0);
  const maxHours = Math.max(...weeklyActivity.map((d) => d.hours));

  const totalLabel = formatHours(totalHours);

  return (
    <div>
      <PageHeader
        title="Good evening, Kartik"
        subtitle="Here's where your skills stand today."
      />

      {/* Stat grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon];
          return (
            <StatCard
              key={stat.label}
              icon={<Icon size={20} />}
              value={stat.value}
              label={stat.label}
              sub={stat.sub}
            />
          );
        })}
      </div>

      {/* Two-column row */}
      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        {/* Left: This week chart */}
        <Card className="p-5 lg:col-span-3 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">This week</h2>
            <span className="text-xs text-label-tertiary">{totalLabel}</span>
          </div>

          <div className="mt-4 flex flex-1 min-h-36 gap-3">
            {weeklyActivity.map((entry) => {
              const isMax = entry.hours === maxHours;
              const heightPct = `${(entry.hours / 8) * 100}%`;
              return (
                <div
                  key={entry.day}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="w-full flex-1 flex items-end justify-center">
                    <div
                      className={`w-9 rounded-full ${isMax ? "bg-accent" : "bg-accent/30"}`}
                      style={{
                        height: heightPct,
                        minHeight: 6,
                      }}
                    />
                  </div>
                  <span className="text-[11px] text-label-tertiary">
                    {entry.day}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right: Recent activity */}
        <Card className="p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold mb-1">Recent activity</h2>
          <ul className="divide-y divide-separator">
            {recentActivity.map((item) => (
              <li key={item.title} className="py-3 flex items-start gap-3">
                <span
                  className={`mt-1.5 size-2 rounded-full shrink-0 ${dotColor(item.type)}`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-snug">
                    {item.title}
                  </p>
                  <p className="text-xs text-label-secondary mt-0.5">
                    {item.detail}
                  </p>
                </div>
                <span className="text-xs text-label-tertiary whitespace-nowrap">
                  {item.time}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
