"use client";

import { useState } from "react";
import { CircleDashed, CircleEllipsis, CheckCircle2 } from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BadgeTone } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { Assignment, AssignmentStatus } from "@/lib/data";

// ---------------------------------------------------------------------------
// Segments config
// ---------------------------------------------------------------------------

const segments: { value: "all" | AssignmentStatus; label: string }[] = [
  { value: "all", label: "All" },
  { value: "in-progress", label: "In Progress" },
  { value: "submitted", label: "Submitted" },
  { value: "graded", label: "Graded" },
];

// ---------------------------------------------------------------------------
// Status config — keeps row JSX clean
// ---------------------------------------------------------------------------

interface StatusConfig {
  tileClass: string;
  Icon: ComponentType<LucideProps>;
  badgeTone: BadgeTone;
  badgeLabel: (a: Assignment) => string;
}

const statusConfig: Record<AssignmentStatus, StatusConfig> = {
  "in-progress": {
    tileClass: "bg-accent-soft text-accent",
    Icon: CircleDashed,
    badgeTone: "blue",
    badgeLabel: () => "In Progress",
  },
  submitted: {
    tileClass: "bg-[#FF9500]/10 text-[#FF9500]",
    Icon: CircleEllipsis,
    badgeTone: "orange",
    badgeLabel: () => "Submitted",
  },
  graded: {
    tileClass: "bg-[#34C759]/10 text-[#34C759]",
    Icon: CheckCircle2,
    badgeTone: "green",
    badgeLabel: (a) => a.grade ?? "Graded",
  },
};

// ---------------------------------------------------------------------------
// Due-date display helper
// ---------------------------------------------------------------------------

function dueLabel(a: Assignment): string {
  return a.status === "in-progress" ? `Due ${a.due}` : a.due;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AssignmentsList({
  assignments,
}: {
  assignments: Assignment[];
}) {
  const [filter, setFilter] = useState<"all" | AssignmentStatus>("all");

  const filtered =
    filter === "all"
      ? assignments
      : assignments.filter((a) => a.status === filter);

  return (
    <div>
      {/* Segmented control */}
      <div
        className="inline-flex rounded-full bg-fill p-1 gap-1"
        role="group"
        aria-label="Filter assignments"
      >
        {segments.map((seg) => (
          <button
            key={seg.value}
            type="button"
            onClick={() => setFilter(seg.value)}
            aria-pressed={filter === seg.value}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              filter === seg.value
                ? "bg-card shadow-card text-label"
                : "text-label-secondary hover:text-label"
            }`}
          >
            {seg.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-4">
        <Card>
          {filtered.length === 0 ? (
            <p className="p-10 text-center text-sm text-label-secondary">
              Nothing here yet.
            </p>
          ) : (
            <ul className="divide-y divide-separator">
              {filtered.map((a) => {
                const cfg = statusConfig[a.status];
                const { Icon } = cfg;
                return (
                  <li key={a.id} className="px-5 py-4 flex items-center gap-4">
                    {/* Status icon tile */}
                    <div
                      className={`size-10 rounded-xl grid place-items-center shrink-0 ${cfg.tileClass}`}
                    >
                      <Icon size={20} />
                    </div>

                    {/* Middle: title + course */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{a.title}</p>
                      <p className="text-xs text-label-secondary mt-0.5">
                        {a.course}
                      </p>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-4 shrink-0">
                      {a.status === "in-progress" && (
                        <ProgressBar value={a.progress} className="w-24" />
                      )}
                      <span className="text-xs text-label-tertiary whitespace-nowrap">
                        {dueLabel(a)}
                      </span>
                      <Badge tone={cfg.badgeTone}>
                        {cfg.badgeLabel(a)}
                      </Badge>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
