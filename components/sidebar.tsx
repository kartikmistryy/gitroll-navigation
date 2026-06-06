"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  ClipboardList,
  Sparkles,
  Trophy,
  Zap,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { user } from "@/lib/data";

const links = [
  { href: "/", label: "Overview", icon: LayoutGrid },
  { href: "/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/skills", label: "Skills", icon: Sparkles },
  { href: "/hackathon", label: "Hackathon", icon: Trophy },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`
        m-3 rounded-card bg-card shadow-card
        flex flex-col shrink-0 overflow-hidden
        transition-[width] duration-250 ease-in-out
        ${collapsed ? "w-[72px]" : "w-64"}
      `}
    >
      {/* Top branding row */}
      <div className="p-4">
        {collapsed ? (
          /* Collapsed: logo glyph + toggle stacked */
          <div className="flex flex-col items-center gap-2">
            <div className="size-9 rounded-xl bg-gradient-to-br from-[#3395FF] to-accent grid place-items-center shrink-0">
              <Zap size={18} className="text-white" fill="currentColor" />
            </div>
            <button
              onClick={() => setCollapsed(false)}
              aria-label="Toggle sidebar"
              className="text-label-secondary hover:bg-fill rounded-lg p-1.5 transition-colors"
            >
              <PanelLeftOpen size={18} />
            </button>
          </div>
        ) : (
          /* Expanded: logo + wordmark + toggle in one row */
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-gradient-to-br from-[#3395FF] to-accent grid place-items-center shrink-0">
              <Zap size={18} className="text-white" fill="currentColor" />
            </div>
            <span className="text-[17px] font-bold tracking-tight whitespace-nowrap flex-1">
              SkillForge
            </span>
            <button
              onClick={() => setCollapsed(true)}
              aria-label="Toggle sidebar"
              className="text-label-secondary hover:bg-fill rounded-lg p-1.5 transition-colors"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="px-3 flex-1">
        <ul className="flex flex-col gap-0.5">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  title={collapsed ? label : undefined}
                  className={`
                    flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium
                    transition-colors whitespace-nowrap
                    ${collapsed ? "justify-center" : ""}
                    ${
                      active
                        ? "bg-accent-soft text-accent"
                        : "text-label-secondary hover:bg-fill hover:text-label"
                    }
                  `}
                >
                  <Icon className="size-5 shrink-0" />
                  {!collapsed && <span>{label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom user card */}
      <div className="p-3 mt-auto">
        <div
          className={`flex items-center gap-3 rounded-xl px-3 py-2.5 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="size-9 rounded-full bg-accent text-white text-xs font-semibold grid place-items-center shrink-0">
            {user.initials}
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user.name}</p>
              <p className="text-xs text-label-secondary truncate">{user.role}</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
