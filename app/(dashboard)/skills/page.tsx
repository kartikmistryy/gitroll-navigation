import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BadgeTone } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { skills } from "@/lib/data";
import type { SkillLevel } from "@/lib/data";

const levelTone: Record<SkillLevel, BadgeTone> = {
  Beginner: "gray",
  Intermediate: "blue",
  Advanced: "orange",
  Expert: "green",
};

export default function SkillsPage() {
  const focusSkill = skills.find((s) => s.focus);
  const otherSkills = skills.filter((s) => !s.focus);

  return (
    <div>
      <PageHeader title="Skills" subtitle="Your proficiency across the stack." />

      {focusSkill && (
        <Card className="p-6 ring-1 ring-accent/20">
          <Badge tone="blue">Focus skill</Badge>
          <p className="mt-3 text-xl font-bold tracking-tight">
            {focusSkill.name}
          </p>
          <p className="mt-1 text-sm text-label-secondary">
            {focusSkill.level} · +12% this month
          </p>
          <div className="mt-4 flex items-center gap-3">
            <ProgressBar value={focusSkill.progress} className="flex-1" />
            <span className="text-sm font-semibold text-accent">
              {focusSkill.progress}%
            </span>
          </div>
        </Card>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {otherSkills.map((skill) => (
          <Card key={skill.name} className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{skill.name}</span>
              <Badge tone={levelTone[skill.level]}>{skill.level}</Badge>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <ProgressBar value={skill.progress} className="flex-1" />
              <span className="text-xs text-label-secondary">
                {skill.progress}%
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
