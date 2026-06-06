# SkillForge Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build SkillForge — an iOS-styled minimal dashboard with a collapsible sidebar and four pages (Overview, Assignments, Skills, Hackathon) on the fresh Next.js scaffold.

**Architecture:** App Router route group `(dashboard)` shares a sidebar shell layout; pages are server components fed by typed mock data in `lib/data.ts`; the sidebar (collapse state) and the Assignments filter are the only client components. All styling is Tailwind v4 utilities over `@theme` tokens defined in `globals.css`.

**Tech Stack:** Next.js (App Router), React 19, Tailwind CSS v4, TypeScript, `lucide-react` (only new dep), Inter via `next/font/google`.

**Verification per task:** `npm run build` passes; visual checks via dev server at the end. No unit tests (per spec).

---

## File Map

| File | Responsibility |
|---|---|
| `app/globals.css` | `@theme` tokens (iOS palette, radii, shadow), preflight guards, base styles |
| `app/layout.tsx` | Root layout: Inter font, metadata, html/body classes |
| `app/(dashboard)/layout.tsx` | Dashboard shell: renders `<Sidebar />` + scrollable `<main>` |
| `app/(dashboard)/page.tsx` | Overview page |
| `app/(dashboard)/assignments/page.tsx` | Assignments page (renders client `AssignmentsList`) |
| `app/(dashboard)/skills/page.tsx` | Skills page |
| `app/(dashboard)/hackathon/page.tsx` | Hackathon page |
| `components/sidebar.tsx` | Client: branding, nav links w/ active state, collapse toggle, user card |
| `components/assignments-list.tsx` | Client: segmented control + filtered assignment rows |
| `components/ui/card.tsx` | White rounded-2xl surface w/ soft shadow |
| `components/ui/badge.tsx` | Status pill (tinted bg + colored text) |
| `components/ui/button.tsx` | iOS-blue rounded button w/ press scale |
| `components/ui/progress-bar.tsx` | Thin rounded track + accent fill |
| `components/ui/stat-card.tsx` | Icon tile + value + label card |
| `components/ui/page-header.tsx` | Page title + subtitle block |
| `lib/data.ts` | TypeScript interfaces + all mock data |

---

### Task 1: Foundation — dependency, theme tokens, root layout

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`
- Delete: `app/page.tsx` (moves into route group in Task 4)

- [ ] **Step 1: Install lucide-react**

Run: `npm install lucide-react` — expect success, 1 package added.

- [ ] **Step 2: Replace `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-bg: #f2f2f7;
  --color-card: #ffffff;
  --color-accent: #007aff;
  --color-accent-soft: rgba(0, 122, 255, 0.1);
  --color-label: #000000;
  --color-label-secondary: #8e8e93;
  --color-label-tertiary: #c7c7cc;
  --color-separator: rgba(60, 60, 67, 0.12);
  --color-fill: rgba(120, 120, 128, 0.08);
  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.06);
  --radius-card: 1rem;
}

html {
  color-scheme: light;
}

html,
body {
  background-color: #f2f2f7 !important;
  color: #000000;
}

::selection {
  background: rgba(0, 122, 255, 0.2);
}
```

- [ ] **Step 3: Replace `app/layout.tsx`** — Inter font (variable, `display: "swap"`), metadata `title: "SkillForge"`, `description: "A skills-first learning dashboard for developers."`, body classes `${inter.className} antialiased bg-bg text-label`. Remove the Geist font imports from the scaffold.

- [ ] **Step 4: Verify build**

Run: `npm run build` — expect PASS (the root `/` route disappears until Task 4; that's fine as long as build succeeds; if Next errors on zero routes, keep a minimal `app/(dashboard)/page.tsx` placeholder and note Task 4 replaces it).

- [ ] **Step 5: Commit** — `feat: add iOS theme tokens, Inter font, lucide-react`

---

### Task 2: Mock data

**Files:**
- Create: `lib/data.ts`

- [ ] **Step 1: Create `lib/data.ts`** with these interfaces and hand-crafted data:

```ts
export interface Stat {
  label: string;
  value: string;
  sub: string;
  icon: "clipboard" | "gauge" | "timer" | "flame";
}

export interface ActivityItem {
  title: string;
  detail: string;
  time: string;
  type: "assignment" | "skill" | "hackathon";
}

export interface WeeklyActivity {
  day: string; // "Mon".."Sun"
  hours: number; // 0..8
}

export type AssignmentStatus = "in-progress" | "submitted" | "graded";

export interface Assignment {
  id: string;
  title: string;
  course: string;
  due: string;
  status: AssignmentStatus;
  progress: number; // 0..100
  grade?: string; // only when graded
}

export type SkillLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Skill {
  name: string;
  level: SkillLevel;
  progress: number; // 0..100
  focus?: boolean; // exactly one skill has focus: true
}

export interface Hackathon {
  id: string;
  name: string;
  date: string;
  format: string; // e.g. "Online" | "Bengaluru, IN"
  theme: string;
  registered?: boolean;
}

export interface PastHackathon {
  name: string;
  date: string;
  placement: string; // e.g. "1st Place", "Finalist"
  project: string;
}
```

Data volumes: `stats` 4, `recentActivity` 6, `weeklyActivity` 7 (varied 0.5–6.5h), `assignments` 8 (3 in-progress / 2 submitted / 3 graded with grades like "A", "B+"), `skills` 8 (React, TypeScript, Next.js, SQL, Python, Git, System Design, UI Design — one `focus: true`), `upcomingHackathons` 3 (first is the featured one, date ~3 weeks from 2026-06-07), `pastHackathons` 3. Also export `user = { name: "Kartik", initials: "KM", role: "Developer" }`.

- [ ] **Step 2: Verify build** — `npm run build` PASS.

- [ ] **Step 3: Commit** — `feat: add typed mock data for all dashboard pages`

---

### Task 3: UI primitives

**Files:**
- Create: `components/ui/card.tsx`, `components/ui/badge.tsx`, `components/ui/button.tsx`, `components/ui/progress-bar.tsx`, `components/ui/stat-card.tsx`, `components/ui/page-header.tsx`

All are server-compatible presentational components (no hooks). Contracts:

- [ ] **Step 1: `Card`** — `{ children, className? }` → `<div className={"bg-card rounded-2xl shadow-card " + className}>`. Use a tiny local `cx` join (template string), no clsx dep.

- [ ] **Step 2: `Badge`** — `{ tone: "blue" | "green" | "orange" | "gray", children }` → `rounded-full px-2.5 py-0.5 text-xs font-medium` with tinted bg/text per tone (e.g. green: `bg-[#34C759]/10 text-[#34C759]`; orange `#FF9500`; blue accent; gray label-secondary).

- [ ] **Step 3: `Button`** — `{ children, variant?: "primary" | "tinted", className? }` → primary: `bg-accent text-white`; tinted: `bg-accent-soft text-accent`; both `rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] hover:opacity-90`.

- [ ] **Step 4: `ProgressBar`** — `{ value: number, className? }` → `h-1.5 rounded-full bg-fill` track with `bg-accent rounded-full` fill at `width: value%`.

- [ ] **Step 5: `StatCard`** — `{ icon: ReactNode, value, label, sub }` → Card containing a `size-10 rounded-xl bg-accent-soft text-accent` icon tile, large `text-2xl font-bold tracking-tight` value, secondary label, tertiary sub line.

- [ ] **Step 6: `PageHeader`** — `{ title, subtitle }` → `text-3xl font-bold tracking-tight` + secondary subtitle, bottom margin.

- [ ] **Step 7: Verify build** — `npm run build` PASS (components unused yet; ensure no lint errors on unused — they're exported, fine).

- [ ] **Step 8: Commit** — `feat: add iOS-style UI primitives`

---

### Task 4: Sidebar + dashboard shell

**Files:**
- Create: `components/sidebar.tsx`, `app/(dashboard)/layout.tsx`, `app/(dashboard)/page.tsx` (placeholder `<PageHeader title="Overview" …/>` until Task 5)

- [ ] **Step 1: `components/sidebar.tsx`** (`"use client"`):
  - `const links = [{ href: "/", label: "Overview", icon: LayoutGrid }, { href: "/assignments", label: "Assignments", icon: ClipboardList }, { href: "/skills", label: "Skills", icon: Sparkles }, { href: "/hackathon", label: "Hackathon", icon: Trophy }]`
  - `useState(false)` for `collapsed`; `usePathname()` for active (exact match).
  - Container: `aside` with `w-64` / `w-[72px]` via collapsed state, `transition-[width] duration-250`, full-height flex column, `bg-card border-r border-separator` (or floating card look: `m-3 rounded-2xl shadow-card` — implementer picks what looks cleaner, floating preferred).
  - Top branding row: `size-9 rounded-xl bg-gradient-to-br from-[#3395FF] to-accent` glyph containing lucide `Zap` (white, size 18) + wordmark `text-[17px] font-bold tracking-tight` "SkillForge" that fades/hides when collapsed; collapse toggle (`PanelLeftClose`/`PanelLeftOpen`) `text-label-secondary hover:bg-fill rounded-lg p-1.5`.
  - Nav: links as `rounded-xl px-3 py-2.5 text-sm font-medium flex items-center gap-3 transition-colors`; active → `bg-accent-soft text-accent`; inactive → `text-label-secondary hover:bg-fill hover:text-label`. Icons `size-5 shrink-0`. Labels hidden when collapsed (`opacity-0 w-0` or conditional render); add `title` attr when collapsed.
  - Bottom user card: avatar circle `size-9 rounded-full bg-accent text-white text-xs font-semibold grid place-items-center` with `user.initials`, name + role stack hidden when collapsed.

- [ ] **Step 2: `app/(dashboard)/layout.tsx`** — server component: `<div className="flex h-dvh"> <Sidebar /> <main className="flex-1 overflow-y-auto"><div className="mx-auto max-w-5xl px-8 py-10">{children}</div></main> </div>`.

- [ ] **Step 3: Placeholder Overview page** so `/` resolves.

- [ ] **Step 4: Verify** — `npm run build` PASS; routes `/` listed.

- [ ] **Step 5: Commit** — `feat: add collapsible iOS sidebar and dashboard shell`

---

### Task 5: Overview page

**Files:**
- Modify: `app/(dashboard)/page.tsx`

- [ ] **Step 1: Compose** (server component, imports from `lib/data.ts`):
  1. `PageHeader title="Good evening, Kartik" subtitle="Here's where your skills stand today."`
  2. Stat grid `grid grid-cols-2 lg:grid-cols-4 gap-4`: map `stats` → `StatCard`, mapping `icon` string → lucide component (`ClipboardList`, `Gauge`, `Timer`, `Flame`).
  3. Two-column row (`grid lg:grid-cols-5 gap-4`): left (3 cols) — Card "This week" CSS bar chart: flex row of 7 columns, each `rounded-full bg-accent` bar with height `h = (hours / 8) * 100%` inside a fixed-height (`h-36`) flex-end container, day labels under; highest day gets full accent, others `bg-accent/30` (compute max in JS). Right (2 cols) — Card "Recent activity": map `recentActivity` → row with type-tinted dot, title, detail, `time` right-aligned tertiary; `divide-y divide-separator`.

- [ ] **Step 2: Verify** — `npm run build` PASS.

- [ ] **Step 3: Commit** — `feat: build Overview page with stats, weekly chart, activity feed`

---

### Task 6: Assignments page

**Files:**
- Create: `components/assignments-list.tsx`
- Modify: `app/(dashboard)/assignments/page.tsx` (create)

- [ ] **Step 1: `components/assignments-list.tsx`** (`"use client"`):
  - Props: `{ assignments: Assignment[] }`. `useState<"all" | AssignmentStatus>("all")`.
  - Segmented control: container `inline-flex rounded-full bg-fill p-1 gap-1`; segments `rounded-full px-4 py-1.5 text-sm font-medium transition-all`; active segment `bg-card shadow-card text-label`; inactive `text-label-secondary hover:text-label`. Labels: All / In Progress / Submitted / Graded.
  - List: one `Card` with `divide-y divide-separator`; each row `px-5 py-4 flex items-center gap-4`: leading status icon tile (in-progress `CircleDashed` blue tint, submitted `CircleEllipsis` orange tint `#FF9500`, graded `CheckCircle2` green tint `#34C759`), then title (`font-medium`) + course (secondary, `text-sm`), then right side: due date (tertiary small) + `Badge` (in-progress→blue "In Progress", submitted→orange "Submitted", graded→green showing `grade`), plus `ProgressBar` (`w-24`) only for in-progress rows.
  - Empty filter state: centered secondary text "Nothing here yet."

- [ ] **Step 2: `app/(dashboard)/assignments/page.tsx`** — server: `PageHeader title="Assignments" subtitle="8 total · 3 in progress"` (compute counts from data) + `<AssignmentsList assignments={assignments} />`.

- [ ] **Step 3: Verify** — `npm run build` PASS.

- [ ] **Step 4: Commit** — `feat: build Assignments page with segmented filter`

---

### Task 7: Skills page

**Files:**
- Create: `app/(dashboard)/skills/page.tsx`

- [ ] **Step 1: Compose** (server):
  1. `PageHeader title="Skills" subtitle="Your proficiency across the stack."`
  2. Focus card (the `skill.focus` item): full-width `Card` with `ring-1 ring-accent/20` accent treatment, "Focus skill" `Badge tone="blue"`, skill name `text-xl font-bold`, level + progress with larger `ProgressBar`, short encouraging line (e.g. "+12% this month").
  3. Grid `grid sm:grid-cols-2 lg:grid-cols-3 gap-4` of remaining skills: Card with name (`font-semibold`), level as `Badge` (Beginner→gray, Intermediate→blue, Advanced→orange, Expert→green), `ProgressBar`, percent right-aligned secondary text.

- [ ] **Step 2: Verify** — `npm run build` PASS.

- [ ] **Step 3: Commit** — `feat: build Skills page with focus card and skill grid`

---

### Task 8: Hackathon page

**Files:**
- Create: `app/(dashboard)/hackathon/page.tsx`

- [ ] **Step 1: Compose** (server):
  1. `PageHeader title="Hackathon" subtitle="Compete, build, ship."`
  2. Featured hero: `Card` with subtle blue wash (`bg-gradient-to-br from-accent-soft to-card` or `bg-accent text-white` variant — implementer judgment, keep it minimal/clean): event name `text-2xl font-bold`, theme line, meta row (Calendar icon + date, MapPin + format), static countdown chips ("21 days · 14 hrs" style, computed by hand in data, not live JS), `Button` "Register".
  3. "Upcoming" section: remaining `upcomingHackathons` as Card rows (name, theme secondary, date + format right, `Badge` "Registered" green when `registered`).
  4. "Past results": Card with `divide-y` rows — placement `Badge` (1st→green, Finalist→blue, else gray), event name + project secondary, date tertiary right.

- [ ] **Step 2: Verify** — `npm run build` PASS.

- [ ] **Step 3: Commit** — `feat: build Hackathon page with featured event and results`

---

### Task 9: Final verification & polish pass

- [ ] **Step 1:** `npm run build` — expect PASS, 4 static routes (`/`, `/assignments`, `/skills`, `/hackathon`).
- [ ] **Step 2:** `npm run dev` + browser/screenshot check of every route: identity matches spec (cream-gray bg, white cards, blue accent, rounded), sidebar collapse animates, active nav pill follows route, segmented control filters, nothing overflows at ~1024px width.
- [ ] **Step 3:** Fix anything visually off (spacing, alignment, contrast) — small targeted edits only.
- [ ] **Step 4:** Commit — `polish: visual fixes across dashboard` (only if fixes were needed).

---

## Self-Review Notes

- **Spec coverage:** identity tokens (T1), data (T2), primitives (T3), sidebar/shell (T4), all 4 pages (T5–T8), verification (T9). Out-of-scope items (dark mode, auth, mobile drawer) correctly absent.
- **Type consistency:** `Badge` tones, `AssignmentStatus`, lucide icon names cross-checked across tasks.
- **Naming:** components referenced identically in all tasks (`AssignmentsList`, `ProgressBar`, `StatCard`, `PageHeader`).
