import React from "react";
import { Card } from "./card";

export function StatCard({
  icon,
  value,
  label,
  sub,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
  sub: string;
}) {
  return (
    <Card className="p-5">
      <div className="size-10 rounded-xl bg-accent-soft text-accent grid place-items-center">
        {icon}
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-sm text-label-secondary">{label}</p>
      <p className="mt-0.5 text-xs text-label-tertiary">{sub}</p>
    </Card>
  );
}
