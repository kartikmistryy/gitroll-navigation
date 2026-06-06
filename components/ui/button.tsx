import type { ReactNode } from "react";

type Variant = "primary" | "tinted";

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-white",
  tinted: "bg-accent-soft text-accent",
};

export function Button({
  children,
  variant = "primary",
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] hover:opacity-90 ${variantClasses[variant]} ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
