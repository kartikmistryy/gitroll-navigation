import React from "react";

type Tone = "blue" | "green" | "orange" | "gray";

const toneClasses: Record<Tone, string> = {
  blue: "bg-accent-soft text-accent",
  green: "bg-[#34C759]/10 text-[#34C759]",
  orange: "bg-[#FF9500]/10 text-[#FF9500]",
  gray: "bg-fill text-label-secondary",
};

export function Badge({
  tone,
  children,
}: {
  tone: Tone;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
