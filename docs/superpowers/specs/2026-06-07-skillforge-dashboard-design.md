# SkillForge Dashboard — Design Spec

**Date:** 2026-06-07
**Status:** Approved by user (pending spec review)

## Purpose

Turn the fresh Next.js scaffold into **SkillForge** — a skills-first learning dashboard for developers. Neat, clean, minimal, with an overall identity like an iOS product: rounded edges, iOS blue accent, white cards on soft gray.

## Visual Identity

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#F2F2F7` | Page background (iOS systemGroupedBackground) |
| `--color-card` | `#FFFFFF` | Card surfaces |
| `--color-accent` | `#007AFF` | iOS blue — CTAs, active nav, links, focus |
| `--color-label` | `#000000` | Primary text |
| `--color-label-secondary` | `#8E8E93` | Secondary text (iOS systemGray) |
| `--color-separator` | `rgba(60,60,67,0.12)` | Hairline rules |

- **Type:** Inter via `next/font/google` (SF Pro analogue). Tight tracking on headings.
- **Shape:** cards `rounded-2xl` (16px); buttons/pills `rounded-full` or `rounded-xl`; soft shadow `0 1px 3px rgba(0,0,0,0.06)`.
- **Interaction:** `active:scale-[0.97]` press on buttons; ~200ms transitions.
- Tokens live in a Tailwind v4 `@theme` block in `app/globals.css`.
- Include the known preflight guards: `color-scheme: light` on `html`, explicit `html, body` background to prevent system dark mode bleed.

## Architecture

```
app/
  layout.tsx              ← root: Inter font, metadata, bg
  (dashboard)/
    layout.tsx            ← shell: sidebar + scrollable content area
    page.tsx              ← Overview  (/)
    assignments/page.tsx
    skills/page.tsx
    hackathon/page.tsx
components/
  sidebar.tsx             ← "use client": collapse state, active link via usePathname
  ui/                     ← presentational: Card, Button, Badge, ProgressBar, StatCard, SegmentedControl
lib/data.ts               ← typed mock data (interfaces + arrays)
```

- Pages are server components. Client components are limited to `sidebar.tsx` (collapse state, active link) and the Assignments filter (`SegmentedControl` + filtered list).
- Dependency added: `lucide-react` (icons only). Nothing else.

## Sidebar

- **Branding (top):** rounded-square blue-gradient logo glyph + "SkillForge" wordmark.
- **Nav:** Overview (`LayoutGrid`), Assignments (`ClipboardList`), Skills (`Sparkles`), Hackathon (`Trophy`). Active link: iOS-blue tint pill (`#007AFF` ≈10% opacity bg, blue icon + text). Hover: subtle gray fill.
- **Collapse:** toggle button animates sidebar from ~256px to 72px icon rail; wordmark/labels fade out, icons center; ~250ms ease. State is local React state (no persistence).
- **Bottom:** decorative user card — avatar initials, name, role.

## Pages (mock data)

1. **Overview** — greeting header ("Good evening, Kartik"); 4 stat cards (assignments due, average skill level, hackathon countdown, day streak); weekly-activity bar chart (pure CSS, 7 bars); recent-activity list (5–6 items).
2. **Assignments** — iOS-style segmented control: All / In Progress / Submitted / Graded (client-side filter); assignment rows in a card list: title, course, due date, status badge, progress bar.
3. **Skills** — grid of skill cards (React, TypeScript, SQL, etc.): icon, progress bar, level label (Beginner → Expert); one highlighted "focus skill" card with accent treatment.
4. **Hackathon** — featured upcoming event hero card (countdown, location/format, blue "Register" CTA); list of other upcoming events; past results section with placement badges.

All data hand-crafted in `lib/data.ts` with TypeScript interfaces — realistic, easily swapped for an API later.

## Out of Scope

Dark mode, real auth/API, mobile drawer nav (desktop-first; layout degrades gracefully but no dedicated mobile UX), state persistence, tests beyond build verification.

## Verification

- `npm run build` passes with no type or lint errors.
- Visual check of all 4 routes in the browser: identity matches spec, sidebar collapse/active states work, segmented control filters.
