import React from "react";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-card rounded-card shadow-card ${className ?? ""}`}>
      {children}
    </div>
  );
}
